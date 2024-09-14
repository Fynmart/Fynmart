// import React from "react";

// const SizeTable = ({ title, headers, rows }) => (
//   <div className="mb-8">
//     <h2 className="text-xl font-bold mb-4">{title}</h2>
//     <table className="w-full border-collapse">
//       <thead>
//         <tr>
//           {headers.map((header, index) => (
//             <th
//               key={index}
//               className="bg-gray-200 border border-gray-300 px-4 py-2"
//             >
//               {header}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, rowIndex) => (
//           <tr
//             key={rowIndex}
//             className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
//           >
//             {row.map((cell, cellIndex) => (
//               <td key={cellIndex} className="border border-gray-300 px-4 py-2">
//                 {cell}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const HowToMeasure = () => (
//   <div className="mb-8">
//     <h2 className="text-xl font-bold mb-4">HOW TO MEASURE</h2>
//     <div className="flex flex-col md:flex-row">
//       <div className="md:w-1/2 pr-4">
//         <ol className="list-decimal list-inside space-y-2">
//           <li>
//             <strong>COLLAR:</strong> measure around neck base where shirt fits
//           </li>
//           <li>
//             <strong>CHEST:</strong> measure around fullest part place tape close
//             under arms make sure tape is flat across the back
//           </li>
//           <li>
//             <strong>SLEEVE:</strong> measure from the collar, along the
//             shoulders and down the outer arm to the hem
//           </li>
//           <li>
//             <strong>WAIST:</strong> measure around natural waistline
//           </li>
//           <li>
//             <strong>INSIDE LEG:</strong> measure from top of inside leg at
//             crotch to ankle bone
//           </li>
//           <li>
//             <strong>OUTSIDE LEG:</strong> measure from natural waistline to hem
//           </li>
//           <li>
//             <strong>CENTRE BACK LENGTH:</strong> measure from the center of the
//             collar seam to the hem
//           </li>
//         </ol>
//       </div>
//       <div className="md:w-1/2 mt-4 md:mt-0">
//         <img
//           src="/assets/menswear-measurement-guide.jpg"
//           alt="Measurement guide"
//           className="max-w-full h-auto"
//         />
//       </div>
//     </div>
//   </div>
// );

// const SizingTables = () => (
//   <div className="container mx-auto px-4">
//     <SizeTable
//       title="Tops, Knitwear, Casual Jackets and Shirts"
//       headers={["UK/European/USA Size", "Inches (Chest)", "CM (Chest)"]}
//       rows={[
//         ["XXS", "To Fit 32-34", "81-86"],
//         ["XS", "To Fit 34-36", "86-91"],
//         ["S", "To Fit 36-38", "91-96"],
//         ["M", "To Fit 38-40", "96-101"],
//         ["L", "To Fit 40-42", "101-106"],
//         ["XL", "To Fit 42-44", "106-111"],
//         ["XXL", "To Fit 44-46", "111-116"],
//       ]}
//     />

//     <SizeTable
//       title="Jeans, Casual Trousers and Shorts"
//       headers={["Inches (Waist)", "CM (Waist)"]}
//       rows={[
//         ["28", "71"],
//         ["30", "76"],
//         ["32", "81"],
//         ["34", "86"],
//         ["36", "91"],
//         ["38", "96"],
//       ]}
//     />

//     <SizeTable
//       title="Jeans and Casual Smart Trousers"
//       headers={["Size", "Inches (Inside Leg)", "CM (Inside Leg)"]}
//       rows={[
//         ["Short", "To Fit 30", "76"],
//         ["Regular", "To Fit 32", "81"],
//         ["Long", "To Fit 34", "86"],
//       ]}
//     />

//     <SizeTable
//       title="Swimwear and Underwear"
//       headers={["UK/European/USA Size", "Inches (Waist)", "CM (Waist)"]}
//       rows={[
//         ["XXS", "To Fit 26-28", "66-71"],
//         ["XS", "To Fit 28-30", "71-76"],
//         ["S", "To Fit 30-32", "76-81"],
//         ["M", "To Fit 32-34", "81-86"],
//         ["L", "To Fit 34-36", "86-91"],
//         ["XL", "To Fit 36-38", "91-96"],
//         ["XXL", "To Fit 38-40", "96-101"],
//       ]}
//     />

//     <SizeTable
//       title="Smart Shirts"
//       headers={[
//         "UK/European/USA Size",
//         "Inches (Chest)",
//         "CM (Chest)",
//         "Inches (Neck)",
//         "CM (Neck)",
//       ]}
//       rows={[
//         ["XXS", "To Fit 32-34", "81-86", "14.25", "36"],
//         ["XS", "To Fit 34-36", "86-91", "14.5", "37"],
//         ["S", "To Fit 36-38", "91-96", "15", "38"],
//         ["M", "To Fit 38-40", "96-101", "16", "41"],
//         ["L", "To Fit 40-42", "101-106", "17", "43"],
//         ["XL", "To Fit 42-44", "106-111", "17.5", "44"],
//         ["XXL", "To Fit 44-46", "111-116", "18", "46"],
//       ]}
//     />

//     <SizeTable
//       title="Smart Jackets and Waistcoat"
//       headers={[
//         "UK/European/USA Size",
//         "UK/USA Inches (Chest)",
//         "CM (Chest)",
//         "European Sizing (Chest)",
//       ]}
//       rows={[
//         ["XXS", "34", "86", "44"],
//         ["XS", "36", "91", "46"],
//         ["S", "38", "96", "48"],
//         ["M", "40", "101", "50"],
//         ["L", "42", "106", "52"],
//         ["XL", "44", "111", "54"],
//         ["XXL", "46", "116", "56"],
//       ]}
//     />

//     <SizeTable
//       title="Smart Trousers"
//       headers={["Inches (Waist)", "CM (Waist)"]}
//       rows={[
//         ["28", "71"],
//         ["30", "76"],
//         ["32", "81"],
//         ["34", "86"],
//         ["36", "91"],
//         ["38", "96"],
//       ]}
//     />

//     <SizeTable
//       title="Belts"
//       headers={["Size", "Inches (Waist)", "CM (Waist)"]}
//       rows={[
//         ["XS", "28-30", "71-76"],
//         ["S", "30-32", "76-81"],
//         ["M", "32-34", "81-86"],
//         ["L-XL", "34-38", "86-96"],
//       ]}
//     />

//     <SizeTable
//       title="Hats - To Fit Head Circumference"
//       headers={["Size", "Inches", "CM"]}
//       rows={[
//         ["S/M", "23¼", "59"],
//         ["M/L", "23½", "60"],
//         ["One Size", "22¾-23½", "58-60"],
//       ]}
//     />

//     <SizeTable
//       title="Footwear"
//       headers={["UK", "US", "European"]}
//       rows={[
//         ["6", "7", "40"],
//         ["7", "8", "41"],
//         ["8", "9", "42"],
//         ["9", "10", "43"],
//         ["10", "11", "44"],
//         ["11", "12", "45"],
//         ["12", "13", "46"],
//       ]}
//     />
//     <HowToMeasure />
//   </div>
// );

// export default SizingTables;

import React from "react";

const SizeTable = ({ title, headers, rows }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-blue-500 px-4 py-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const HowToMeasure = () => (
  <div className="mb-8 bg-white shadow-md rounded-lg overflow-hidden">
    <h2 className="text-2xl font-bold mb-4 bg-blue-600 text-white p-4">
      HOW TO MEASURE
    </h2>
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-1/2 pr-4">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            <strong>COLLAR:</strong> measure around neck base where shirt fits
          </li>
          <li>
            <strong>CHEST:</strong> measure around fullest part place tape close
            under arms make sure tape is flat across the back
          </li>
          <li>
            <strong>SLEEVE:</strong> measure from the collar, along the
            shoulders and down the outer arm to the hem
          </li>
          <li>
            <strong>WAIST:</strong> measure around natural waistline
          </li>
          <li>
            <strong>INSIDE LEG:</strong> measure from top of inside leg at
            crotch to ankle bone
          </li>
          <li>
            <strong>OUTSIDE LEG:</strong> measure from natural waistline to hem
          </li>
          <li>
            <strong>CENTRE BACK LENGTH:</strong> measure from the center of the
            collar seam to the hem
          </li>
        </ol>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <img
          src="/assets/menswear-measurement-guide.jpg"
          alt="Measurement guide"
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
);

const SizingTables = () => (
  <div className="bg-gray-100 px-4 sm:px-6 lg:px-[100px] py-[50px]">
    <div className="max-w-7xl mx-auto">
      <header className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-3xl font-bold">Sizing Guide</h1>
      </header>
      <main className="bg-white shadow-md rounded-b-lg overflow-hidden p-6 space-y-8">
        <SizeTable
          title="Tops, Knitwear, Casual Jackets and Shirts"
          headers={["UK/European/USA Size", "Inches (Chest)", "CM (Chest)"]}
          rows={[
            ["XXS", "To Fit 32-34", "81-86"],
            ["XS", "To Fit 34-36", "86-91"],
            ["S", "To Fit 36-38", "91-96"],
            ["M", "To Fit 38-40", "96-101"],
            ["L", "To Fit 40-42", "101-106"],
            ["XL", "To Fit 42-44", "106-111"],
            ["XXL", "To Fit 44-46", "111-116"],
          ]}
        />

        <SizeTable
          title="Jeans, Casual Trousers and Shorts"
          headers={["Inches (Waist)", "CM (Waist)"]}
          rows={[
            ["28", "71"],
            ["30", "76"],
            ["32", "81"],
            ["34", "86"],
            ["36", "91"],
            ["38", "96"],
          ]}
        />

        <SizeTable
          title="Jeans and Casual Smart Trousers"
          headers={["Size", "Inches (Inside Leg)", "CM (Inside Leg)"]}
          rows={[
            ["Short", "To Fit 30", "76"],
            ["Regular", "To Fit 32", "81"],
            ["Long", "To Fit 34", "86"],
          ]}
        />

        <SizeTable
          title="Swimwear and Underwear"
          headers={["UK/European/USA Size", "Inches (Waist)", "CM (Waist)"]}
          rows={[
            ["XXS", "To Fit 26-28", "66-71"],
            ["XS", "To Fit 28-30", "71-76"],
            ["S", "To Fit 30-32", "76-81"],
            ["M", "To Fit 32-34", "81-86"],
            ["L", "To Fit 34-36", "86-91"],
            ["XL", "To Fit 36-38", "91-96"],
            ["XXL", "To Fit 38-40", "96-101"],
          ]}
        />

        <SizeTable
          title="Smart Shirts"
          headers={[
            "UK/European/USA Size",
            "Inches (Chest)",
            "CM (Chest)",
            "Inches (Neck)",
            "CM (Neck)",
          ]}
          rows={[
            ["XXS", "To Fit 32-34", "81-86", "14.25", "36"],
            ["XS", "To Fit 34-36", "86-91", "14.5", "37"],
            ["S", "To Fit 36-38", "91-96", "15", "38"],
            ["M", "To Fit 38-40", "96-101", "16", "41"],
            ["L", "To Fit 40-42", "101-106", "17", "43"],
            ["XL", "To Fit 42-44", "106-111", "17.5", "44"],
            ["XXL", "To Fit 44-46", "111-116", "18", "46"],
          ]}
        />

        <SizeTable
          title="Smart Jackets and Waistcoat"
          headers={[
            "UK/European/USA Size",
            "UK/USA Inches (Chest)",
            "CM (Chest)",
            "European Sizing (Chest)",
          ]}
          rows={[
            ["XXS", "34", "86", "44"],
            ["XS", "36", "91", "46"],
            ["S", "38", "96", "48"],
            ["M", "40", "101", "50"],
            ["L", "42", "106", "52"],
            ["XL", "44", "111", "54"],
            ["XXL", "46", "116", "56"],
          ]}
        />

        <SizeTable
          title="Smart Trousers"
          headers={["Inches (Waist)", "CM (Waist)"]}
          rows={[
            ["28", "71"],
            ["30", "76"],
            ["32", "81"],
            ["34", "86"],
            ["36", "91"],
            ["38", "96"],
          ]}
        />

        <SizeTable
          title="Belts"
          headers={["Size", "Inches (Waist)", "CM (Waist)"]}
          rows={[
            ["XS", "28-30", "71-76"],
            ["S", "30-32", "76-81"],
            ["M", "32-34", "81-86"],
            ["L-XL", "34-38", "86-96"],
          ]}
        />

        <SizeTable
          title="Hats - To Fit Head Circumference"
          headers={["Size", "Inches", "CM"]}
          rows={[
            ["S/M", "23¼", "59"],
            ["M/L", "23½", "60"],
            ["One Size", "22¾-23½", "58-60"],
          ]}
        />

        <SizeTable
          title="Footwear"
          headers={["UK", "US", "European"]}
          rows={[
            ["6", "7", "40"],
            ["7", "8", "41"],
            ["8", "9", "42"],
            ["9", "10", "43"],
            ["10", "11", "44"],
            ["11", "12", "45"],
            ["12", "13", "46"],
          ]}
        />

        <HowToMeasure />
      </main>
      <footer className="bg-gray-200 p-6 text-center text-gray-600 rounded-b-lg mt-4">
        <p>Last updated: [Insert Date]</p>
      </footer>
    </div>
  </div>
);

export default SizingTables;
