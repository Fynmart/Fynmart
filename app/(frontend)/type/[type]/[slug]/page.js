"use client";
import React from "react";
import Products from "./components/Products";
import { PATH_URL } from "@/lib/utils";
import { generateServerToken } from "@/lib/token";

const Page = ({ params }) => {
  const { type, slug } = params;

  const [data, setData] = React.useState(null);

  const getData = async () => {
    const serverToken = await generateServerToken();
    if (type == "search") {
      const request = await fetch(
        PATH_URL + "custom/product-with-related-search.php?query=" + slug
      );
      const response = await request.json();
      setData(response);
    } else {
      const request = await fetch(
        PATH_URL + `/custom/type-wise-products.php?type=${type}&slug=${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-TOKEN": serverToken,
          },
        }
      );

      const response = await request.json();
      setData(response);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Products data={data} />
    </div>
  );
};

export default Page;
