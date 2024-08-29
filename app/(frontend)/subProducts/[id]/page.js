"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PATH_URL } from "@/lib/utils"; // Assuming you have this utility
import Loader from "../../components/Loader";

const CategoriesPage = ({ params }) => {
  const { id, slug } = params;
  console.log("Params data", params);

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  // const getSubData = async () => {
  //   const formData = new FormData();
  //   formData.append("select", JSON.stringify(["*"]));

  //   try {
  //     const response = await fetch("/api/imdos/sub_categories/read", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("subcategories", data);

  //     setSubCategories(data.data || []);
  //     const current = data.data.find((sub) => sub.id === id);
  //     setCurrentSubCategory(current);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const getData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "products.sub_category_id",
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("products", data);

      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getData();
    // getSubData();
  }, [id]);

  const filteredProducts = products.filter(
    (product) => product.sub_category_id === id
  );

  if (!products) {
    return (
      <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:px-[100px] md:px-[50px] px-4 space-y-3 pt-2 py-4">
      <h1 className="md:font-extrabold pt-4 font-bold md:text-2xl mb-3 pl-2 md:pl-0">
        {/* {currentSubCategory ? currentSubCategory.name : "Products"} */}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link
              //   href={`/product/${item.slug}`}
              href={"/Ourproduct/" + item?.slug}
              key={item.id}
              className="group bg-[#f06ae53a] p-3 shadow-lg relative border rounded-xl"
            >
              <div className="md:h-[280px] overflow-hidden rounded-lg">
                <img
                  className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                  src={`${PATH_URL}${item.product_thumbnail}`}
                  alt={item.name || "Product"}
                />
              </div>
              <div className="text-black pt-3">
                <h1 className="text-center font-extrabold text-[18px] mt-2 px-1 truncate">
                  {item.name || "Unnamed Product"}
                </h1>
                <p className="text-center mt-1">Price: ${item.unit_price}</p>
              </div>
            </Link>
          ))
        ) : (
          // <p className="text-center col-span-full">
          //   No products found in this category.
          // </p>
          <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
