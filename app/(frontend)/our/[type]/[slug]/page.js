"use client";
import React, { useState, useEffect } from "react";
import { PATH_URL } from "@/lib/utils";
import Link from "next/link";

const Page = ({ params }) => {
  const { type, slug, id } = params;
  const [data, setData] = useState([]);

  const getData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["slug"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "id",
          type: "=",
          value: id,
        },
      ])
    );

    try {
      const response = await fetch("/api/imdos/products/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch category ID");
      }

      const result = await response.json();
      setData(result.data);
      console.log("djshcv", result);
      // Assuming `result.data` contains the product data
    } catch (error) {
      console.error("Error fetching category ID:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [slug]); // Re-run the effect if `slug` changes

  return (
    <div>
      <h1>Products in {slug} category</h1>
      {console.log(data)}
      <div className="px-5 lg:px-[200px] pt-4 mb-4">
        <h1 className="md:font-extrabold font-bold md:text-2xl mb-3 pl-2 md:pl-0">
          All Products list {slug}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-3">
          {data.length === 0 ? (
            <div className="border p-3 rounded-xl">
              <img
                src="/assets/no-products.jpg"
                alt="Not Found"
                className="w-[300px] m-auto"
              />
            </div>
          ) : (
            data.map((item, index) => {
              let discountAmount = 1.5;

              for (const range of discountRanges) {
                if (item?.price <= range.max) {
                  discountAmount = range.discount;
                  break;
                }
              }
              const higherPrice = item?.price * discountAmount;
              const discountPercentage = Math.floor(
                ((higherPrice - item?.price) / higherPrice) * 100
              );
              return (
                <Link
                  href={`/product/${item.slug}`}
                  key={index}
                  className="group bg-white p-3 shadow-lg relative border rounded-xl"
                >
                  <div className="h-[250px] overflow-hidden rounded-lg">
                    <img
                      className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                      src={`${PATH_URL}${item.thumbnail}`}
                      alt="Product"
                      width="100%"
                    />
                  </div>
                  <div className="text-black pt-3">
                    <h1>{item.product}</h1>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
