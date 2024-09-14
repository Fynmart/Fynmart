import React from "react";

const Table = ({ title, headers, rows }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 bg-blue-600 text-white p-3">
      {title}
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left"
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
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 bg-blue-600 text-white p-3">
      HOW TO MEASURE
    </h2>
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-4">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            <strong>TOP OF SHOULDER:</strong> Measure from shoulder to shoulder
          </li>
          <li>
            <strong>BUST:</strong> Measure around fullest part and across
            shoulder blades
          </li>
          <li>
            <strong>WAIST:</strong> Measure around natural waistline
          </li>
          <li>
            <strong>HIPS:</strong> Measure at widest point
          </li>
          <li>
            <strong>INSIDE LEG:</strong> Measure from top of inside leg at
            crotch to ankle bone
          </li>
        </ol>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <img
          src="/assets/womenswear-measurement-guide.gif"
          alt="How to measure"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  </div>
);

const HowToMeasureMaternity = () => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4 bg-blue-600 text-white p-3">
      HOW TO MEASURE MATERNITY
    </h2>
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-4">
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            <strong>BUST:</strong> Measure around fullest part
          </li>
          <li>
            <strong>WAIST:</strong> Measure around natural waistline
          </li>
          <li>
            <strong>LOW HIP:</strong> Measure around fullest part approx. 20cm
            below waist
          </li>
        </ol>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <img
          src="/assets/womenswear-maternity-measurement-guide.gif"
          alt="How to measure maternity"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  </div>
);

const WomensSizingTables = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Women&apos;s Sizing Guide</h1>
        </header>
        <main className="p-6 space-y-8">
          <Table
            title="CLOTHING - DUAL SIZE CONVERSION"
            headers={["", "XS", "S", "M", "L", "XL"]}
            rows={[
              ["UK", "XS", "S", "M", "L", "XL"],
              ["European", "XS", "S", "M", "L", "XL"],
              ["US", "XXS", "XS", "S", "M", "L"],
              ["Australia", "XS", "S", "M", "L", "XL"],
            ]}
          />

          <Table
            title="CLOTHING - DUAL SIZE"
            headers={[
              "DUAL SIZE",
              "UK XS / 6",
              "UK S / 8-10",
              "UK M / 12-14",
              "UK L / 16-18",
              "UK XL / 20",
            ]}
            rows={[
              [
                "",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
              ],
              [
                "Bust",
                "78½ | 31",
                "81-86 | 32-34",
                "91-78 | 36-38",
                "101-108½ | 40-43",
                "116 | 45½",
              ],
              [
                "Waist",
                "60½ | 23¾",
                "63-68 | 24½-26½",
                "73-78 | 28¾-30¾",
                "83-90½ | 32¾-35¾",
                "98 | 38½",
              ],
              [
                "Hips",
                "86 | 33¾",
                "88½-93½ | 34¾-36¾",
                "98½-103½ | 38¾-40¾",
                "108½-116 | 42¾-45¾",
                "123½ | 48½",
              ],
            ]}
          />

          <Table
            title="MATERNITY CLOTHING"
            headers={["SINGLE SIZE", "8", "10", "12", "14", "16", "18", "20"]}
            rows={[
              [
                "",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
                "CM | Inches",
              ],
              [
                "Bust",
                "86 | 34",
                "91 | 36",
                "96 | 38",
                "101 | 40",
                "106 | 42",
                "113 | 44½",
                "120 | 47½",
              ],
              [
                "Waist",
                "95 | 37½",
                "100 | 39½",
                "105 | 41½",
                "110 | 43½",
                "115 | 45½",
                "122 | 48½",
                "129 | 51",
              ],
              [
                "Hips",
                "93 | 36½",
                "98 | 38½",
                "103 | 40½",
                "108 | 42½",
                "113 | 44½",
                "120 | 47½",
                "127 | 48½",
              ],
            ]}
          />

          <Table
            title="MAIN RANGE LENGTHS (BASED ON AVERAGE SIZE 10)"
            headers={["", "TROUSERS", "SKIRTS", "DRESS"]}
            rows={[
              [
                "Short",
                "Inches: 30 | CM: 76",
                "Mini - Inches: 14 | CM: 35",
                "Mini - Inches: 33½ | CM: 85",
              ],
              [
                "Regular",
                "Inches: 32 | CM: 81",
                "Midi - Inches: 17½ | CM: 45",
                "Midi - Inches: 35½ | CM: 90",
              ],
              [
                "Long",
                "Inches: 34 | CM: 86",
                "Knee - Inches: 21½ | CM: 55",
                "Knee - Inches: 37½ | CM: 95",
              ],
              [
                "",
                "",
                "Calf - Inches: 29½ | CM: 75",
                "Calf - Inches: 39½ | CM: 100",
              ],
              [
                "",
                "",
                "Maxi - Inches: 37½ | CM: 95",
                "Maxi - Inches: 56 | CM: 142",
              ],
            ]}
          />

          <Table
            title="PETITE LENGTHS (BASED ON AVERAGE PETITE SIZE 10)"
            headers={["TROUSERS", "SKIRTS", "DRESS"]}
            rows={[
              [
                "Inches: 29 | CM: 74",
                "Mini - Inches: 13 | CM: 33",
                "Mini - Inches: 31½ | CM: 80",
              ],
              ["", "Midi - Inches: 17 | CM: 43", "Midi - Inches: 33½ | CM: 85"],
              [
                "",
                "Knee - Inches: 20½ | CM: 52",
                "Knee - Inches: 35½ | CM: 90",
              ],
              ["", "Calf - Inches: 25½ | CM: 65", "Calf - Inches: 37 | CM: 93"],
              [
                "",
                "Maxi - Inches: 33½ | CM: 85",
                "Maxi - Inches: 54 | CM: 137",
              ],
            ]}
          />

          <Table
            title="DUAL SIZES SWIMWEAR"
            headers={["UK", "6", "8/10", "12/14", "16/18", "20/22"]}
            rows={[
              ["European", "34", "36/38", "40/42", "44/46", "48/50"],
              ["US", "4", "6/8", "10/12", "14/16", "18/20"],
              ["Australia", "8", "10/12", "14/16", "18/20", "22/24"],
            ]}
          />

          <Table
            title="BRA SIZING"
            headers={["UK", "EUROPEAN", "US", "AUSTRALIA"]}
            rows={[
              ["32A", "70A", "32A", "10A"],
              ["32B", "70B", "32B", "10B"],
              ["32C", "70C", "32C", "10C"],
              ["32D", "70D", "32D", "10D"],
              ["32DD", "70E", "32DD", "10DD"],
              ["34A", "75A", "34A", "12A"],
              ["34B", "75B", "34B", "12B"],
              ["34C", "75C", "34C", "12C"],
              ["34D", "75D", "34D", "12D"],
              ["34DD", "75E", "34DD", "12DD"],
              ["36A", "80A", "36A", "14A"],
              ["36B", "80B", "36B", "14B"],
              ["36C", "80C", "36C", "14C"],
              ["36D", "80D", "36D", "14D"],
              ["36DD", "80E", "36DD", "14DD"],
              ["38A", "85A", "38A", "16A"],
              ["38B", "85B", "38B", "16B"],
              ["38C", "85C", "38C", "16C"],
              ["38D", "85D", "38D", "16D"],
              ["38DD", "85E", "38DD", "16DD"],
            ]}
          />

          <Table
            title="HOSIERY (S-L)"
            headers={["HEIGHT", "DRESS SIZE"]}
            rows={[
              ["Up to 5'3\"", 'UK 6-10 / 32-37" - Small'],
              ["Up to 5'6\"", 'UK 10-14 / 37-41" - Medium'],
              ["Up to 5'9\"", 'UK 14-18 / 41-46" - Large'],
            ]}
          />

          <Table
            title="HOSIERY (ONE SIZE)"
            headers={["HEIGHT", "DRESS SIZE"]}
            rows={[
              ["Up to 5'8\"", 'UK 8-14 / 34-41" - One Size'],
              ["Up to 5'11\"", 'UK 16-20 / 41-46" - One Size'],
            ]}
          />

          <Table
            title="FOOTWEAR - WOMENS"
            headers={["UK", "2", "3", "4", "5", "6", "7", "8"]}
            rows={[
              ["Australia", "4", "5", "6", "7", "8", "9", "10"],
              ["US", "4", "5", "6", "7", "8", "9", "10"],
              ["European", "35", "36", "37", "38", "39", "40", "41"],
            ]}
          />

          <HowToMeasure />
          <HowToMeasureMaternity />
        </main>
      </div>
    </div>
  );
};

export default WomensSizingTables;
