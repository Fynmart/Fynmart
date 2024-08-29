"use client";
import React, { useEffect, useState } from "react";
import { PATH_URL } from "@/lib/utils";
import Link from "next/link";
import { Loader } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("select", JSON.stringify(["id", "name", "logo", "slug"]));
    formData.append("order", JSON.stringify({ on: "priority", type: "DESC" }));

    try {
      const response = await fetch("/api/imdos/categories/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("cat", data);

      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen fixed bg-white w-screen flex items-center justify-center">
        Loding....
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen fixed bg-white w-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:px-[100px] md:px-[50px] px-4 space-y-3 pt-2">
      <h1 className="md:font-extrabold font-bold md:text-2xl mb-3 pl-2 md:pl-0 pt-4">
        All Categories items
      </h1>
      {(!categories || categories.length === 0) && (
        <div className="border p-3 rounded-xl ">
          <img
            src="/assets/no-products.jpg"
            alt="Not Found"
            className="w-[300px] m-auto"
          />
          <p className="text-center text-xl font-bold mt-[-30px] pt-8">
            Category not available
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pt-5 gap-3">
        {categories?.map((item) => (
          <Link
            href={`/sub/${item.id}`}
            key={item.id}
            className="group bg-[#f06ae53a] p-3 shadow-lg relative border rounded-xl"
          >
            <div className="flex items-start justify-between absolute w-full px-5 top-5 left-0 z-[5]"></div>
            <div className="h-[200px] overflow-hidden rounded-lg">
              <img
                className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                src={`${PATH_URL}${item?.logo}`}
                alt={item.name || "Category"}
                width="100%"
                height="100%"
              />
            </div>
            <div className="text-black pt-3">
              <h1 className="text-center font-extrabold text-[18px] my-2 px-1 truncate">
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
