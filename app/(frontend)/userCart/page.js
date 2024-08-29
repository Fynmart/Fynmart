"use client";
import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { useImdosUI } from "@/providers/ImdosProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { verifyJWT } from "@/lib/token";

const ShoppingCart = () => {
  const { isCartUpdated, setIsCartUpdated } = useImdosUI();
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cart_data")) || [];
    setCartItems(storedCartData);
  }, [isCartUpdated]);

  const removeCartItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart_data", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    toast.success("Item removed from cart");
    setIsCartUpdated(!isCartUpdated);
  };

  const updateQuantity = (id, change) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("cart_data", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    setIsCartUpdated(!isCartUpdated);
  };

  // const calculateTotals = () => {
  //   const subtotal = cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  //   const tax = subtotal * 0.05;
  //   const shipping = 10;
  //   const discount = 50;
  //   const total = subtotal + tax + shipping - discount;
  //   return { subtotal, tax, shipping, discount, total };
  // };

  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const itemDiscount = (item.higher_price - item.price) * item.quantity;
      totalDiscount += itemDiscount > 0 ? itemDiscount : 0;
    });

    const tax = subtotal * 0.05;
    const shipping = 10;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, discount: totalDiscount, total };
  };

  const onSubmit = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        router.push("/login");
        return;
      }

      const payloads = await verifyJWT(userToken);

      const formData = new FormData();
      formData.append("items", JSON.stringify(cartItems));
      formData.append("user_id", payloads.id);

      const response = await fetch("/api/imdos/cart_items/create", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      localStorage.removeItem("cart_data");
      setCartItems([]);
      toast.success("Request created successfully. We will contact you soon!");
      setIsCartUpdated(!isCartUpdated);
    } catch (error) {
      toast.error(
        error.message || "Failed to submit form. Please try again later."
      );
    }
  };

  const { subtotal, tax, shipping, discount, total } = calculateTotals();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 overflow-y-auto h-[360px] no-scrollbar">
          {cartItems.length === 0 ? (
            <p className="text-center py-4">No cart items found</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="mb-4 border-b pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <img
                      src={item.image || "/assets/no-products.jpg"}
                      alt={item.title}
                      className="w-[150px] h-[150px] object-cover mr-2"
                    />
                    <div className="space-y-1 mx-4">
                      <h2 className="line-clamp-1 text-sm font-medium">
                        {item.title || "Untitled Product"}
                      </h2>
                      {item.description && (
                        <p className="line-clamp-2 text-xs text-gray-500">
                          Description: {item.description}
                        </p>
                      )}
                      <p className="line-clamp-1 text-xs text-gray-500">
                        Price: ₹{item.price || "0.00"}
                      </p>
                      <p className="line-clamp-1 text-xs text-gray-500">
                        Higher Price: ₹{item.higher_price || "0.00"}
                      </p>
                      <p className="line-clamp-1 text-xs text-gray-500">
                        Shipping cost: ₹{item.shippingCost || "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity || 1}
                      className="w-8 text-center mx-1"
                      readOnly
                    />
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-500 mt-2"
                      aria-label="Remove item"
                    >
                      <Trash size={25} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full md:w-1/3">
            <div className="bg-blue-100 p-2 text-blue-800 rounded mb-4">
              🎉 You have Saved ₹{discount.toFixed(2)}!
            </div>

            <div className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between mb-2">
                <span>Total Products</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount on product</span>
                <span>- ₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={onSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded mt-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full text-blue-600 py-2 mt-2"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
