import React from "react";
import { PATH_URL } from "@/lib/utils";
import Link from "next/link";
function ProductCard({ product, item }) {
  return (
    <Link
      href={"/Ourproduct/" + item?.slug}
      // href={"fhdj"}
      className="group bg-white m-2 shadow-lg relative border rounded-xl"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          className="object-cover h-full w-full group-hover:scale-[110%] group-hover:rotate-[2deg] transition-all duration-200"
          src={
            item?.thumbnail ? `${PATH_URL}/${item.thumbnail}` : "/default.png"
          }
          alt={item?.item || "item"}
          width={200}
          height={200}
        />
      </div>
      <div className="text-black ">
        <h1 className="font-extrabold text-[12px] px-2 line-clamp-1">
          {item?.item || "item Name"}
        </h1>
        <p className="text-[10px] truncate text-ellipsis line-clamp-1 px-2">
          {item?.description || "No description available"}
        </p>
        <div className="flex items-center gap-2 border-t-2 px-2">
          <h1 className="text-[25px] md:text-[15px]">₹{item?.price}</h1>
          <del className="text-[15px] text-[#FF6262]">
            ₹{item?.higher_price}
          </del>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
