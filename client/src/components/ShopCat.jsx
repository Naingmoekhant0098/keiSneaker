import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ShopCat = () => {
  return (
    <div className="max-w-7xl mx-auto my-8 flex flex-col md:p-3 px-5">
      <h1 className=" mb-6 text-2xl md:text-3xl font-semibold uppercase">
        Shop By Category
      </h1>
      <div className="flex flex-col md:flex-row gap-0 md:gap-4  ">
        <div className="w-full md:w-1/3 h-[350px] md:h-auto  group relative cursor-pointer overflow-hidden ">
          <img
            className=" h-full w-full object-cover  transition duration-500 group-hover:scale-110"
            src="https://images.vans.com/is/image/Vans/VN000CN1_R2S_ALT1?wid=1600&hei=1984&fmt=jpeg&qlt=90&resMode=sharp2&op_usm=0.9,1.7,8,0"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
              <div>shop for Women</div>
              <Link to={"/shops?category=men"}>
              <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
              </Link>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
            <div>shop for Women</div>
            <Link to={"/shops?category=women"}>
            <div className=" text-sm bg-white text-black  p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
            </Link>
          </h1>
        </div>
        <div className=" w-full md:w-1/3 h-[350px] md:h-auto group relative cursor-pointer overflow-hidden">
          <img
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-110"
            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f01fa759-508f-487a-8e2c-03681eb51191/air-jordan-1-retro-high-og-mens-shoes-JHpxkn.png"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
              <div>shop for Men</div>
              <div className=" text-sm bg-white text-black p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
            <div>shop for Men</div>
            <Link to={"/shops?category=kids"}>
            <div className=" text-sm bg-white text-black p-2 px-3 md:p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
            </Link>
          </h1>
        </div>
        <div className=" w-full md:w-1/3 h-[350px] md:h-auto group relative cursor-pointer overflow-hidden">
          <img
            className=" h-full w-full object-cover transition duration-500 group-hover:scale-110"
            src="https://images.journeys.com/images/products/1_109776_ZM_ALT1C.JPG"
            alt=""
          />
          <span className="h-full w-full hidden md:block bg-black absolute top-0 opacity-0  transition duration-500 group-hover:opacity-40"></span>
          <div className=" hidden md:block">
            <h1 className="mt-3  flex transition duration-300 opacity-0 group-hover:opacity-100  text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex-col  gap-3">
              <div>shop for Kids</div>
              <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
                Shop Now
              </div>
            </h1>
          </div>
          <span className="h-full md:hidden w-full bg-black absolute top-0 opacity-40"></span>
          <h1 className="mt-3 md:hidden transition duration-300 flex-col   text-white absolute bottom-8 left-5 z-10 text-lg capitalize font-mediun flex  gap-2">
            <div>shop for Kids</div>
            <div className=" text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShopCat;
