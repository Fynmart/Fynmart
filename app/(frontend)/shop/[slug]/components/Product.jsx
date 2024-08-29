"use client";
import React, { useEffect, useState } from "react";
import { Heart, Info, ShoppingCart } from "lucide-react";
import { PATH_URL } from "@/lib/utils";
import ProductCard from "@/app/(frontend)/components/ProductCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import toast from "react-hot-toast";
import { useImdosUI } from "@/providers/ImdosProvider";
import { useParams } from "next/navigation";

const Product = () => {
  const { slug } = useParams();
  const [number, setNumber] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isCartUpdated, setIsCartUpdated } = useImdosUI();

  const discountRanges = [
    { max: 500, discount: 5 },
    { max: 2000, discount: 3.5 },
    { max: 5000, discount: 2 },
    { max: 10000, discount: 1.5 },
  ];

  let discountAmount = 1.5;

  if (productData?.price) {
    for (const range of discountRanges) {
      if (productData.price <= range.max) {
        discountAmount = range.discount;
        break;
      }
    }
  }

  const higherPrice = productData?.price
    ? productData.price * discountAmount
    : 0;
  const discountPercentage = Math.floor(
    ((higherPrice - (productData?.price || 0)) / higherPrice) * 100
  );

  const inc = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const dec = () => {
    if (number > (productData?.minimum_order_qty || 0)) {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };

  const handleCart = () => {
    if (!productData) return;

    const existingData = JSON.parse(localStorage.getItem("cart_data")) || [];
    const currentItem = {
      itemId: productData.id,
      title: productData.product,
      quantity: number,
      image: PATH_URL + productData?.product_thumbnail,
    };

    const existingItemIndex = existingData.findIndex(
      (item) => item.itemId === currentItem.itemId
    );

    if (existingItemIndex !== -1) {
      existingData[existingItemIndex].quantity = currentItem.quantity;
      toast.error("Item already exists in the cart, updated the quantity.");
    } else {
      existingData.push(currentItem);
      toast.success("Item added to cart.");
    }
    setIsCartUpdated(!isCartUpdated);
    localStorage.setItem("cart_data", JSON.stringify(existingData));
  };

  const fetchProductData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "slug",
          type: "=",
          value: slug,
        },
      ])
    );

    try {
      const response = await fetch("/api/imdos/products/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const result = await response.json();
      console.log("dgfd", result);

      setProductData(result.data[0]); // Assuming result.data is an array and taking the first item
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchRelatedProductData = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));

    try {
      const response = await fetch("/api/imdos/products/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch related product data");
      }

      const result = await response.json();
      setRelatedProducts(result.data || []); // Assuming result.data contains related products
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchRelatedProductData();
  }, [slug]);

  const [products, setProducts] = useState([]);

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
      console.log(data);

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <div>No product data available.</div>;
  }

  return (
    <>
      <div className="w-full bg-[#FFFFFF] pb-3">
        <div className="px-4 sm:px-6 lg:px-[200px] pt-4 space-y-4 pb-2">
          <div className="flex flex-col md:flex-row">
            <div className="w-full lg:w-[450px]">
              <img
                src={
                  selectedImage ??
                  PATH_URL + (productData?.product_thumbnail || "")
                }
                alt="Product Image"
                className="rounded-lg w-full h-[400px] lg:h-[450px] object-cover"
              />

              <div className="pt-5 w-full">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    productData?.additional_image_1,
                    productData?.additional_image_2,
                    productData?.additional_image_3,
                    productData?.product_thumbnail,
                  ].map((item, index) =>
                    item ? (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(PATH_URL + item)}
                      >
                        <img
                          src={PATH_URL + item}
                          alt={`Image ${index}`}
                          className="lg:h-[130px] p-2 md:p-4 lg:w-[140px] h-[100px] w-[150px] rounded-lg object-contain border"
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 text-black px-[10px] md:px-[80px] space-y-4 max-h-[80vh] overflow-y-auto">
              <h1 className="font-bold text-2xl md:text-3xl text-nowrap pt-3">
                {productData?.name}
              </h1>
              <hr className="pt-4" />
              <span
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              ></span>

              <div className="flex items-center justify-right gap-4">
                <p className="font-bold">Quantity</p>
                <div className="flex justify-between items-center cursor-pointer rounded font-bold gap-2">
                  <div
                    className="w-[20px] h-[20px] rounded-full select-none text-xl bg-black text-white flex items-center justify-center hover:bg-[#FF7D19]"
                    onClick={dec}
                  >
                    <h1>-</h1>
                  </div>

                  <input
                    type="number"
                    value={number}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);

                      if (value >= productData.minimum_order_qty) {
                        setNumber(value);
                      }
                    }}
                    className="pt-1 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-10 bg-white outline-none"
                  />
                  <div
                    className="w-[20px] h-[20px] rounded-full text-xl bg-black select-none text-white flex items-center justify-center hover:bg-[#FF7D19]"
                    onClick={inc}
                  >
                    <h1>+</h1>
                  </div>
                </div>
              </div>

              <div className="flex md:items-center gap-2 md:gap-3">
                <button
                  onClick={handleCart}
                  className="bg-zinc-900 text-[15px] px-6 md:px-8 py-2 md:py-3 gap-3 flex items-center justify-center rounded-full border border-1 text-white font-semibold text-nowrap"
                >
                  <ShoppingCart />
                  Add to Cart
                </button>
              </div>
              <h1 className="text-nowrap mt-4 md:py-3 h-full text-[20px] font-extrabold md:text-[25px]">
                Related Products
              </h1>

              {products.length === 0 ? (
                <div className="border p-3 rounded-xl">
                  <img
                    src="/assets/not-found.png"
                    alt="Not Found"
                    className="h-[150px] mx-auto"
                  />
                  <p className="text-center font-bold">No Related Products</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((item, index) => (
                    <>
                      <div
                        href={"/shop/" + products.slug}
                        // href={"fhdj"}
                        className="group bg-white p-2 shadow-lg relative border rounded-xl"
                      >
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <img
                            className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
                            src={
                              products?.thumbnail
                                ? `${PATH_URL}/${products.thumbnail}`
                                : "/default.png"
                            }
                            alt={products?.products || "Products"}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="text-black pt-2">
                          <h1 className="font-extrabold text-[12px] px-1 truncate">
                            {products?.products || "Products Name"}
                          </h1>
                          <p className="text-[10px] px-1">
                            {products?.description ||
                              "No description available"}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
