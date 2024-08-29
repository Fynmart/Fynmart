"use client";
import { Badge } from "@/components/ui/badge";
import { PATH_URL } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = ({ data, slug }) => {
  const discountRanges = [
    { max: 500, discount: 5 },
    { max: 2000, discount: 3.5 },
    { max: 5000, discount: 2 },
    { max: 10000, discount: 1.5 },
  ];

  return (
    <div className="px-5 lg:px-[200px] pt-4 mb-4">
      <h1 className="md:font-extrabold font-bold md:text-2xl mb-3 pl-2 md:pl-0">
        All Products list {slug}
      </h1>
      {data?.length === 0 && (
        <div className="border p-3 rounded-xl ">
          <img
            src="/assets/no-products.jpg"
            alt="Not Found"
            className="w-[300px] m-auto"
          />
        </div>
      )}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-3">
        {data?.map((item, index) => {
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
              href={"/product/" + item.slug}
              key={index}
              className="group bg-white p-3 shadow-lg relative border rounded-xl"
            >
              <div className="h-[250px] overflow-hidden rounded-lg">
                <img
                  className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                  src={PATH_URL + item.thumbnail}
                  alt="Product"
                  width="100%"
                />
              </div>
              <div className="text-black pt-3">
                <h1>{item.product}</h1>
                {/* <div className="flex items-center gap-2">
                  <h1 class="text-sm md:text-md font-extrabold">
                    ₹{item?.price}
                  </h1>
                  <del className="text-[15px] text-[#FF6262]">
                    ₹{higherPrice}
                  </del>
                  <span className="bg-green-600 pt-1 text-[11px] px-3 py-0.5 text-white rounded-full">
                    {discountPercentage}% Discount
                  </span>
                </div> */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
