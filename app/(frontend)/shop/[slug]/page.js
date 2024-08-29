import React from "react";
import Product from "./components/Product";

const ProductPage = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      <Product slug={slug} />
    </div>
  );
};

export default ProductPage;
