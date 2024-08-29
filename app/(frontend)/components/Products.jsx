"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PATH_URL } from "@/lib/utils";
import Loader from "./Loader";

const Products = () => {
  const [categories, setCategories] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${PATH_URL}/custom/randomlyDiscoverproducts.php`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      setCategories(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!categories) {
    return (
      <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col lg:px-[100px] md:px-[50px] px-4 space-y-3 pt-2 py-4">
      <h1 className="md:font-extrabold pt-4 font-bold md:text-2xl mb-3 pl-2 md:pl-0">
        Discover products for you
      </h1>
      {categories.length > 0 ? (
        categories.map((category, catIndex) => (
          <div key={catIndex}>
            <h2 className="text-lg font-bold mb-2">{category.header}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {category.items.map((item, index) => (
                <Link
                  key={index}
                  href={"/Ourproduct/" + item.slug}
                  className="group bg-white p-2 shadow-lg relative border rounded-xl"
                >
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                      src={
                        item.image
                          ? `${PATH_URL}/${item.thumbnail}`
                          : "/default.png"
                      }
                      alt={item.product || "Product"}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-black pt-2">
                    <h1 className="font-extrabold text-[12px] px-1 truncate">
                      {item.product || "Product Name"}
                    </h1>
                    <p className="text-[10px] px-1 line-clamp-2">
                      {item.description || "No description available"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 border-t-2 py-2">
                    <h1 className="text-[10px] md:text-[15px]">
                      ₹{item?.price}
                    </h1>
                    <del className="text-[15px] text-[#FF6262]">
                      ₹{item?.higher_price}
                    </del>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="border p-3 rounded-xl ">
          <img
            src="/assets/no-products.jpg"
            alt="Not Found"
            className="w-[300px] m-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Products;
