"use client";
// import React, { useState } from "react";
// import SizingTables from "./components/SizingTables";
// import WomensSizingTables from "../size-chartsforwomen/SizingTables";

// const App = () => {
//   const [selectedGender, setSelectedGender] = useState("men");

//   const handleGenderSelect = (gender) => {
//     setSelectedGender(gender);
//   };

//   return (
//     <div className="App">
//       <div className="flex justify-center mb-4">
//         <button
//           className={`px-4 py-2 ${
//             selectedGender === "women"
//               ? "bg-gray-800 text-white"
//               : "bg-white text-black"
//           }`}
//           onClick={() => handleGenderSelect("women")}
//         >
//           WOMEN
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             selectedGender === "men"
//               ? "bg-white text-black"
//               : "bg-gray-200 text-gray-700"
//           }`}
//           onClick={() => handleGenderSelect("men")}
//         >
//           MEN
//         </button>
//       </div>
//       <p className="text-center mb-4">
//         Select product type to display the corresponding size guide below:
//       </p>
//       {selectedGender === "women" ? <WomensSizingTables /> : <SizingTables />}
//     </div>
//   );
// };

// export default App;

"use client";
import React, { useState } from "react";
import SizingTables from "./components/SizingTables";
import SizingTablesForWomen from "./components/SizingTablesForWomen";

const App = () => {
  const [selectedGender, setSelectedGender] = useState("men");

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Sizing Guide</h1>
        </header>
        <main className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
            <button
              className={`px-6 py-2 mb-2 sm:mb-0 sm:mr-2 rounded-full transition-colors duration-300 ${
                selectedGender === "women"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleGenderSelect("women")}
            >
              WOMEN
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                selectedGender === "men"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleGenderSelect("men")}
            >
              MEN
            </button>
          </div>
          <p className="text-center text-gray-700 mb-4">
            Select product type to display the corresponding size guide below:
          </p>
          <div className="bg-gray-50  rounded-lg">
            {selectedGender === "women" ? (
              <SizingTablesForWomen />
            ) : (
              <SizingTables />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
