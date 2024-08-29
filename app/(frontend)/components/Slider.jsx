"use client";
import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Loader from "./Loader";
import { PATH_URL } from "@/lib/utils";

const Slider = () => {
  const [banners, setBanners] = useState(null);

  const getData = async () => {
    const formData = new FormData();
    formData.append(
      "select",
      JSON.stringify(["id", "name", "priority", "file"])
    );

    formData.append("order", JSON.stringify({ on: "priority", type: "DESC" }));
    formData.append(
      "rawConditions",
      JSON.stringify(["WHERE type IN ('main_banner','global'"])
    );

    const request = await fetch("/api/imdos/banners/read", {
      method: "POST",
      body: formData,
    });

    const response = await request.json();
    setBanners(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const splideOptions = {
    rewind: true,
    autoplay: true,
    arrows: false,
  };

  if (!banners) {
    return (
      <div class="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-white z-[9999]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-2 px-4 lg:px-[100px] md:px-[50px] py-[15px] pt-4">
      <div className="border-t border-opacity-10 border-black-300">
        <Splide
          options={splideOptions}
          className="overflow-hidden md:rounded-3xl rounded-[10px]"
        >
          {banners.map((item, index) => (
            <SplideSlide key={item.id}>
              <img
                src={PATH_URL + item.file}
                alt={item.name || `Slide ${index + 1}`}
                width={900}
                height={460}
                className="h-[180px] md:h-[460px] w-full object-cover"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Slider;
