 import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ShopHeigh = () => {
  return (
    <div className="max-w-7xl mx-auto my-8 flex flex-col md:p-3 px-5">
      <h1 className=" mb-6 text-2xl md:text-3xl font-semibold uppercase">
        Shop By Heigh
      </h1>
      <div className="flex flex-col md:flex-row gap-0 md:gap-4  ">
        <div className="w-full md:w-1/3 h-[350px] md:h-auto  group relative cursor-pointer overflow-hidden ">
          <img
            className=" h-full w-full object-cover  transition duration-500 group-hover:scale-110"
            src="https://nothingnew.com/cdn/shop/products/1024x1024-WMN-HighTop-Grey-LS-2_1024x1024.jpg?v=1651851878"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
              <div>Shop Heigh Top Shoes</div>
              <Link to={"/shops?heights=high top"}>
              <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
              </Link>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
          <div>Shop Heigh Top Shoes</div>
            <Link to={"/shops?heights=high top"}>
            <div className=" text-sm bg-white text-black  p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
            </Link>
          </h1>
        </div>


        <div className=" w-full md:w-1/3 h-[350px] md:h-auto group relative cursor-pointer overflow-hidden">
          <img
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-110"
            src=" https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Converse-Chuck-Taylor-All-Star-Pro-Black-Mid-Top-Skate-Shoes-_355701-alt9-US-AVS.jpg"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
              <div>shop  Mid Top Shoes</div>
              <Link to={'/shops?heights=mid top'}>
             
              <div className=" text-sm bg-white text-black p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
              </Link>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
          <div>shop  Mid Top Shoes</div>
          <Link to={'/shops?heights=mid top'}>
            <div className=" text-sm bg-white text-black p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
            </Link>
            
          </h1>
        </div>


        <div className=" w-full md:w-1/3 h-[350px] md:h-auto group relative cursor-pointer overflow-hidden">
          <img
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-110"
            src="https://nothingnew.com/cdn/shop/products/1024x1024-Men-LowTop-NavyWhite-LB2_1024x1024.jpg?v=1652120355"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
            <div>shop for Low Top Shoes</div>
            <Link to={'/shops?heights=low top'}>
              <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
              </Link>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
            <div>shop for Low Top Shoes</div>
            <Link to={'/shops?heights=low top'}>
            <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShopHeigh;
