"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { PATH_URL } from "@/lib/utils";
import ProductCard from "@/app/(frontend)/components/ProductCard";
import toast from "react-hot-toast";
import { useImdosUI } from "@/providers/ImdosProvider";
import { generateServerToken, verifyJWT } from "@/lib/token";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/app/(frontend)/components/Loader";

const Product = ({ slug }) => {
  const router = useRouter();
  const [number, setNumber] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loggedIn, setLoggedIn } = useImdosUI(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { isCartUpdated, setIsCartUpdated } = useImdosUI();

  const [address, setAddress] = useState({}); // Initialize 'address' state

  const getDatass = async () => {
    const formData = new FormData();
    formData.append("select", JSON.stringify(["*"]));
    formData.append(
      "conditions",
      JSON.stringify([
        {
          on: "id",
          type: "=",
          value: loggedIn.id, // Use 'user.id' instead of 'user.value'
        },
      ])
    );

    try {
      const response = await fetch("/api/imdos/users/read", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAddress(data.data[0]); // Set the address from the fetched data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getDatass(); // Fetch data only if the user is logged in
    }
  }, [loggedIn]);

  const discountRanges = [
    { max: 500, discount: 5 },
    { max: 2000, discount: 3.5 },
    { max: 5000, discount: 2 },
    { max: 10000, discount: 1.5 },
  ];

  let discountAmount = 1.5;

  for (const range of discountRanges) {
    if (productData?.price <= range.max) {
      discountAmount = range.discount;
      break;
    }
  }
  const higherPrice = productData?.price * discountAmount;
  const discountPercentage = Math.floor(
    ((higherPrice - productData?.price) / higherPrice) * 100
  );

  const inc = () => {
    setNumber(Number(number) + 1);
  };

  const dec = () => {
    if (number > productData?.minimum_order_qty) {
      setNumber(Number(number) - 1);
    }
  };

  const handleCart = () => {
    const existingData = JSON.parse(localStorage.getItem("cart_data")) || [];
    const currentItem = {
      id: productData.id,
      itemId: productData.id,
      title: productData.product,
      quantity: number,
      image: PATH_URL + productData?.thumbnail,
      category_id: productData.category_id,
      current_stock_qty: productData.current_stock_qty,
      description: productData.description,
      discount_amount: productData.discount_amount,
      higher_price: productData.higher_price,
      minimum_order_qty: productData.minimum_order_qty,
      price: productData.price,
      retailer: productData.retailer,
      slug: productData.slug,
      unit: productData.unit,
      color: selectedColor,
      size: selectedSize,
      payment_method: selectedPaymentMethod,
    };

    const existingItemIndex = existingData.findIndex(
      (item) => item.itemId === currentItem.itemId
    );

    if (existingItemIndex !== -1) {
      existingData[existingItemIndex] = {
        ...existingData[existingItemIndex],
        ...currentItem,
      };
      toast.error("Item already exists in the cart, updated the details");
    } else {
      existingData.push(currentItem);
      toast.success("Item added to cart");
    }

    setIsCartUpdated(!isCartUpdated);
    localStorage.setItem("cart_data", JSON.stringify(existingData));
  };

  const getData = async () => {
    try {
      const serverToken = await generateServerToken();
      const request = await fetch(
        PATH_URL + "custom/product-with-related.php?slug=" + slug
      );
      const response = await request.json();
      console.log("cartpr", response);

      setProductData(response.current[0]);
      setRelatedProducts(response.related);
      setNumber(response.current[0].minimum_order_qty);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomString = Math.random().toString(36).substr(2, 8); // Random alphanumeric string
    return `ORDER-${timestamp}-${randomString}`;
  };

  const buyNow = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        router.push("/login");
        return;
      }

      const payloads = await verifyJWT(userToken);

      const orderId = generateOrderId();

      const buyNowItem = {
        id: productData.id,
        itemId: productData.id,
        title: productData.product,
        quantity: number,
        image: productData.thumbnail,
        category_id: productData.category_id,
        current_stock_qty: productData.current_stock_qty,
        description: productData.description,
        discount_amount: productData.discount_amount,
        higher_price: productData.higher_price,
        minimum_order_qty: productData.minimum_order_qty,
        price: productData.price,
        retailer: productData.retailer,
        slug: productData.slug,
        unit: productData.unit,
        color: selectedColor,
        size: selectedSize,
        payment_method: selectedPaymentMethod,
        orderId,
      };

      const formData = new FormData();
      formData.append("items", JSON.stringify([buyNowItem]));
      formData.append("user_id", payloads.id);

      const response = await fetch("/api/imdos/cart_items/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      toast.success("Order placed successfully! We will contact you soon.");
      // router.push("/order-confirmation");
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error(
        error.message || "Failed to place order. Please try again later."
      );
    }
  };

  const handleBuyNowClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const colors = ["Red", "Blue", "Green", "Black"];
  const sizes = ["S", "M", "L", "XL"];

  if (!productData) {
    return (
      <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-[#FFFFFF] pb-3">
        <div className="px-4 sm:px-6 lg:px-[100px] pt-4 space-y-4 pb-2">
          <div className="flex flex-col md:flex-row md:h-[calc(100vh-100px)]">
            <div className="w-full md:w-1/2 lg:w-[450px] md:sticky md:top-0 md:self-start">
              <img
                src={selectedImage ?? PATH_URL + (productData?.thumbnail || "")}
                alt="img"
                className="rounded-lg w-full h-[400px] lg:h-[450px] object-cover"
              />
              <div className="pt-5 w-full">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    productData?.additional_image_1,
                    productData?.additional_image_2,
                    productData?.additional_image_3,
                    productData?.thumbnail,
                  ].map((item, index) => (
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
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 text-black px-[10px] md:px-[80px] space-y-4 overflow-y-auto md:h-[calc(100vh-100px)] no-scrollbar md:block hidden">
              <h1 className="font-bold text-2xl md:text-3xl pt-3">
                {productData?.product}
              </h1>
              <div className="flex items-center gap-2">
                <h1 className="text-[25px] md:text-[30px]">
                  ₹{productData?.price}
                  <span className="text-[20px] ml-2">/{productData?.unit}</span>
                </h1>
                <del className="text-[15px] text-[#FF6262]">₹{higherPrice}</del>
              </div>
              <hr className="pt-4" />
              <span>{productData?.description}</span>
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
                      const value = e.target.value;
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
              {productData?.color === "available" && (
                <div className="flex items-center justify-right gap-4">
                  <p className="font-bold">Color</p>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-4 h-4 rounded-full ${
                          selectedColor === color ? "ring-2 ring-black" : ""
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {productData?.type === "clothing" && (
                <div className="flex items-center justify-right gap-4">
                  <p className="font-bold">Size</p>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-4 h-4 rounded-full border ${
                          selectedSize === size
                            ? "bg-black text-white text-[10px]"
                            : "bg-white text-black text-[10px]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex md:items-center gap-2 md:gap-3">
                <button
                  onClick={handleCart}
                  className="bg-zinc-900 text-[15px] px-6 md:px-8 py-2 md:py-3 gap-3 flex items-center justify-center rounded-full border border-1 text-white font-semibold text-nowrap"
                >
                  <ShoppingCart />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNowClick}
                  className="gap-3 px-6 md:px-8 py-2 md:py-3 shadow-lg border border-1 flex items-center justify-center rounded-full bg-[#0a0a0a] text-white font-semibold"
                >
                  Buy Now
                </button>
              </div>
              <div>
                <h1 className="text-nowrap mt-4 md:py-3 h-full text-[20px] font-extrabold md:text-[25px]">
                  Related Products
                </h1>
                {productData && !relatedProducts && (
                  <p className="text-center text-xl font-bold mt-[-30px]">
                    Products not available
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {relatedProducts?.map((item, index) => (
                    <ProductCard
                      key={index}
                      badge={"Limited Offers"}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Mobile view */}
          <div className="flex-1 text-black px-[10px] md:px-[80px] space-y-4 block md:hidden">
            <h1 className="font-bold text-2xl md:text-3xl text-nowrap pt-3">
              {productData?.product}
            </h1>
            <div className="flex items-center gap-2">
              <h1 className="text-[25px] md:text-[30px]">
                ₹{productData?.price}
              </h1>
              <del className="text-[15px] text-[#FF6262]">₹{higherPrice}</del>
            </div>
            <hr className="pt-4" />
            <span>{productData?.description}</span>

            <div className="flex items-center justify-right gap-4">
              <p className="font-bold">Quantity</p>
              <div className=" flex justify-between items-center cursor-pointer rounded font-bold gap-2">
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
                    const value = e.target.value;

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

            <div className=" space-y-2">
              {productData?.color === "available" && (
                <div className="flex items-center justify-right gap-4">
                  <p className="font-bold">Color</p>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-4 h-4 rounded-full ${
                          selectedColor === color ? "ring-2 ring-black" : ""
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size selection */}
              {productData?.type === "clothing" && (
                <div className="flex items-center justify-right gap-4">
                  <p className="font-bold">Size</p>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-7 h-7 rounded-full border ${
                          selectedSize === size
                            ? "bg-black text-white md:text-[10px] text-[15px] "
                            : "bg-white text-black md:text-[10px] text-[15px] "
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex md:items-center gap-2 md:gap-3">
              <button
                onClick={handleCart}
                className="bg-zinc-900 text-[15px] px-6 md:px-8 py-2 md:py-3 gap-3 flex items-center justify-center rounded-full border border-1 text-white font-semibold text-nowrap"
              >
                <ShoppingCart />
                Add to Cart
              </button>

              {/* <button
                onClick={() => buyNow(productData, number)}
                className="gap-3 px-6 md:px-8 py-2 md:py-3 shadow-lg border border-1  flex items-center justify-center rounded-full bg-[#0a0a0a] text-white font-semibold"
              >
                Buy Now
              </button> */}
              <button
                onClick={handleBuyNowClick}
                className="gap-3 px-6 md:px-8 py-2 md:py-3 shadow-lg border border-1 flex items-center justify-center rounded-full bg-[#0a0a0a] text-white font-semibold"
              >
                Buy Now
              </button>
            </div>
            <div>
              <h1 className="text-nowrap mt-4 md:py-3 h-full text-[20px] font-extrabold md:text-[25px]">
                Related Products
              </h1>

              {productData && !relatedProducts && (
                <p className="text-center text-xl font-bold mt-[-30px]">
                  Products not available
                </p>
              )}

              <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {relatedProducts?.map((item, index) => (
                  <ProductCard
                    key={index}
                    badge={"Limited Offers"}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-[600px] w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Purchase
            </h2>
            <p className="mb-4">
              Please review your order details and select a payment method.
            </p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                {["Cash on Delivery"].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={selectedPaymentMethod === method}
                      onChange={() => setSelectedPaymentMethod(method)}
                      className="mr-2"
                    />
                    {method}
                  </label>
                ))}
                {selectedPaymentMethod === "UPI" && (
                  <div>
                    <img src="/assets/delivery.png" alt="UPI QR Code" />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex justify-between items-start">
              <div className="d">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <p>Product: {productData?.product}</p>
                <p>Quantity: {number}</p>
                <p>Price: ₹{productData?.price * number}</p>
                {selectedColor && <p>Color: {selectedColor}</p>}
                {selectedSize && <p>Size: {selectedSize}</p>}
              </div>
              <div className="d">
                <h3 className="font-semibold mb-2">Shipping Details</h3>
                <p>Name: {address?.name}</p>
                <p>Address: {address?.address}</p>
                <p>Phone: {address?.phone}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedPaymentMethod) {
                    toast.error("Please select a payment method");
                    return;
                  }
                  closeModal();
                  buyNow();
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
