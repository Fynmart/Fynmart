"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PATH_URL } from "@/lib/utils"; // Assuming you have this utility
import Loader from "../../components/Loader";

const CategoriesPage = ({ params }) => {
  const { id, slug } = params;

  const [categories, setCategories] = useState([]);

  const getData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "category_id",
          type: "=",
          value: id,
        },
      ])
    );

    try {
      const response = await fetch("/api/imdos/sub_categories/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      setCategories(data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

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
        Categories
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 pt-5 gap-3">
        {categories.length > 0 ? (
          categories.map((item) => (
            <Link
              href={`/subProducts/${item.id}`}
              // href={"/type/category/" + item.slug}
              key={item.id}
              className="group bg-[#f06ae53a] p-3 shadow-lg relative border rounded-xl"
            >
              <div className="h-[200px] overflow-hidden rounded-lg">
                <img
                  className="object-cover group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                  src={`${PATH_URL}${item.logo}`}
                  alt={item.name || "Category"}
                />
              </div>
              <div className="text-black pt-3">
                <h1 className="text-center font-extrabold text-[18px] mt-2 px-1 truncate">
                  {item.name || "Unnamed Category"}
                </h1>
              </div>
            </Link>
          ))
        ) : (
          <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
