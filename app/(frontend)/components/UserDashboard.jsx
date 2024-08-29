// "use client";

// import { useImdosUI } from "@/providers/ImdosProvider";
// import { useEffect, useState } from "react";

// function UserDashboard() {
//   // const { user, setUser } = useImdosUI();
//   // const [address, setAddress] = useState("");
//   // const getData = async () => {
//   //   const formData = new FormData();
//   //   formData.append("select", JSON.stringify(["*"]));
//   //   // formData.append(
//   //   //   "conditions",
//   //   //   JSON.stringify([
//   //   //     {
//   //   //       on: "id",
//   //   //       type: "=",
//   //   //       value: user.value,
//   //   //     },
//   //   //   ])
//   //   // );

//   //   try {
//   //     const response = await fetch("/api/imdos/users/read", {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Network response was not ok");
//   //     }

//   //     const data = await response.json();

//   //     setAddress(data.data);
//   //   } catch (error) {
//   //     console.error("Error fetching categories:", error);
//   //     setError("Failed to fetch categories. Please try again.");
//   //   }
//   // };

//   // useEffect(() => {
//   //   getData();
//   // }, []);

//   const { loggedIn, setLoggedIn } = useImdosUI(false);

//   const purchaseHistory = [
//     {
//       name: "Nokia 6300 4G Dual S...",
//       price: "₹ 78.40",
//       image: "/assets/no-products.jpg",
//     },
//     {
//       name: "ASUS ROG Phone 5 D...",
//       price: "₹ 333.50",
//       image: "/assets/Logo.png",
//     },
//     {
//       name: "ASUS ROG Phone 2 (...",
//       price: "₹ 301.00",
//       image: "/assets/neweCOM.png",
//     },
//     {
//       name: "2021 Apple 12.9-inch...",
//       price: "₹ 789.10",
//       image: "/assets/neweCOM.png",
//     },
//     {
//       name: "ASUS ROG Phone 5 D...",
//       price: "₹ 333.50",
//       image: "/assets/Logo.png",
//     },
//     {
//       name: "ASUS ROG Phone 2 (...",
//       price: "₹ 301.00",
//       image: "/assets/neweCOM.png",
//     },
//     {
//       name: "2021 Apple 12.9-inch...",
//       price: "₹ 789.10",
//       image: "/assets/neweCOM.png",
//     },
//   ];

//   const defaultAddress = {
//     line1: "4471 Nutters Barn Lane Des Moines,",
//     line2: "IA 50309",
//     line3: "5252, Alabaster, Alabama",
//     country: "United States",
//     phone: "5156416642",
//   };
//   useEffect(() => {
//     console.log("sddssd", loggedIn);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-7 p-3">
//       <div className="space-y-5 border-b border-black md:border-none md:col-span-1">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-4xl font-bold text-red-500">2</h2>
//           <p className="text-sm text-red-500">Products in Your Cart</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-4xl font-bold text-blue-500">29</h2>
//           <p className="text-sm text-blue-500">Products in Your Wishlist</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-4xl font-bold text-green-500">130</h2>
//           <p className="text-sm text-green-500">Products You Ordered</p>
//         </div>
//       </div>

//       <div className="bg-white rounded shadow md:col-span-1">
//         <h3 className="font-bold mb-4 p-2">Recent Purchase History</h3>
//         <div className="bg-white p-4 rounded shadow max-h-80 overflow-y-auto border">
//           {purchaseHistory.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center mb-4 last:mb-0 border py-2"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover mr-4"
//               />
//               <div>
//                 <p className="text-sm line-clamp-1">{item.name}</p>
//                 <p className="text-sm font-bold">{item.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded shadow md:col-span-1">
//         <h3 className="font-bold p-2">Default Shipping Address</h3>
//         <div className="p-4">
//           <p>{loggedIn?.address}</p>
//           <p>{defaultAddress?.line2}</p>
//           <p>{defaultAddress?.line3}</p>
//           <p>{defaultAddress?.country}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;

"use client";

import { useImdosUI } from "@/providers/ImdosProvider";
import { useEffect, useState } from "react";

function UserDashboard() {
  const { user, loggedIn } = useImdosUI(); // Destructure 'user' and 'loggedIn' from the context
  const [address, setAddress] = useState({}); // Initialize 'address' state

  const getData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "id",
          type: "=",
          value: loggedIn.id, // Use 'user.id' instead of 'user.value'
        },
      ])
    );

    try {
      const response = await fetch("/api/imdos/users/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAddress(data.data[0]); // Set the address from the fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getData(); // Fetch data only if the user is logged in
    }
  }, [loggedIn]);

  const purchaseHistory = [
    {
      name: "Nokia 6300 4G Dual S...",
      price: "₹ 78.40",
      image: "/assets/no-products.jpg",
    },
    {
      name: "ASUS ROG Phone 5 D...",
      price: "₹ 333.50",
      image: "/assets/Logo.png",
    },
    {
      name: "ASUS ROG Phone 2 (...",
      price: "₹ 301.00",
      image: "/assets/neweCOM.png",
    },
    {
      name: "2021 Apple 12.9-inch...",
      price: "₹ 789.10",
      image: "/assets/neweCOM.png",
    },
    {
      name: "ASUS ROG Phone 5 D...",
      price: "₹ 333.50",
      image: "/assets/Logo.png",
    },
    {
      name: "ASUS ROG Phone 2 (...",
      price: "₹ 301.00",
      image: "/assets/neweCOM.png",
    },
    {
      name: "2021 Apple 12.9-inch...",
      price: "₹ 789.10",
      image: "/assets/neweCOM.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-7 p-3">
      <div className="space-y-5 border-b border-black md:border-none md:col-span-1">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-4xl font-bold text-red-500">2</h2>
          <p className="text-sm text-red-500">Products in Your Cart</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-4xl font-bold text-blue-500">29</h2>
          <p className="text-sm text-blue-500">Products in Your Wishlist</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-4xl font-bold text-green-500">130</h2>
          <p className="text-sm text-green-500">Products You Ordered</p>
        </div>
      </div>

      <div className="bg-white rounded shadow md:col-span-1">
        <h3 className="font-bold mb-4 p-2">Recent Purchase History</h3>
        <div className="bg-white p-4 rounded shadow max-h-80 overflow-y-auto border">
          {purchaseHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-4 last:mb-0 border py-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <p className="text-sm line-clamp-1">{item.name}</p>
                <p className="text-sm font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded shadow md:col-span-1">
        <h3 className="font-bold p-2">Default Shipping Address</h3>
        <div className="p-4">
          <p>{address?.line1}</p>
          <p>{address?.line2}</p>
          <p>{address?.line3}</p>
          <p>{address?.address}</p>
          <p>{address?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
