import React from "react";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Categoryes from "./components/Categoryes";
import Products from "./components/Products";
import WantToJoinWithUs from "./components/WantToJoinWithUs";
import Footer from "./components/Footer";

function page() {
  return (
    // <div className='bg-gradient-to-r from-[#097b6e] via-[#134543] to-[#134543]'>
    <div className="bg-[#fce7f386]">
      <Slider />
      <Categoryes />
      <Products />
    </div>
  );
}

export default page;
