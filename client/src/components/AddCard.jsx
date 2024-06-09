import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCross } from "react-icons/fa6";
import Card from "./Card";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import {
    FreeMode,
    Pagination,
    Navigation,
    EffectFade,
    Scrollbar,

}
from 'swiper/modules'
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Controller } from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "swiper/css/free-mode";
import { Button } from "flowbite-react";
import {IoMdClose} from "react-icons/io"
import { useDispatch } from "react-redux";
import { addToCart } from "../Slice/UserSlice";
import toast from "react-hot-toast";
const AddCard = ({setShowCard,clickData}) => {
  const swp = useRef(null);
  const [activeIndex, setActiveInex] = useState(0);
  const [addItem, setAddItem] = useState(null);
  const [selectedColor,setSelectedColor] = useState();
  const[selectedSize , setSelectedSize] = useState();

  useEffect(()=>{
    setAddItem({
      _id: clickData?._id,
      slug: clickData?.slug,
      name: clickData?.name,
      price: clickData?.price,
      code: clickData?.code,
      short_description: clickData?.short_description,
      ribbon: clickData?.ribbon,
      photos:clickData?.photos,
      size: clickData?.sizes[0],
      category: clickData?.category,
      brand: clickData?.brand,
      color: clickData?.colors[0],
      collect: clickData?.collect,
      isOnSale: clickData?.isOnSale,
      onSalePrice: clickData?.onSalePrice,
      onSalePercentage: clickData?.onSalePercentage,
      heigh: clickData?.heigh,
      qty: 1,
    });

  },[clickData])
  const dispatch = useDispatch()
  const AddCardHandler = () => {
   
      dispatch(addToCart(addItem));
      setShowCard(false)
      toast("Item added",{
        icon : '🥂'
      })

   
  };
  
  return (
    <div
      className=" fixed top-0 z-50 p-4 md:p-0 w-full  h-full flex items-center justify-center "
      style={{ background: "rgba(0,0,0,0.3)" }}
       
    >
      <div className="w-full  md:max-w-[900px] md:max-h-[500px]  bg-white p-3 flex">
        <div className=" w-1/2 max:h-[450px]" >
          <Swiper

            modules={[Controller,Navigation]}
            navigation
            onBeforeInit={(swpp) => {
              // swp.current = swpp;
            }}
            onSlideChange={(ans) => setActiveInex(ans.activeIndex)}
            className="w-full h-full"
             
          >

            {
              clickData && clickData?.photos.map((img,index)=>{
                return <SwiperSlide key={index} className=" w-full h-full">
              
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              })
            }
           
            
          </Swiper>
        </div>
        <div className=" w-1/2 p-3 relative">
        <IoMdClose
            className=" absolute top-0 right-0 transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
            onClick={()=>setShowCard(false)}
          />
            <div className=" text-xl font-semibold w-[90%]">
             {clickData?.name}
            </div>
            <div className=" mt-1 font-medium ">
            <span
              className={` ${
                clickData?.isOnSale && "line-through opacity-70 text-sm"
              }`}
            >
              ${clickData?.price}
            </span>
            {clickData?.isOnSale && (
              <span className="ms-3">${clickData?.onSalePrice}</span>
            )}
            </div>
            <div className=" mt-2 text-[12px] font-semibold text-gray-500">
            {clickData?.category} {clickData?.heigh} shoe
          </div>

            <div className=" text-sm mt-1 text-gray-500">
                <span>CODE : </span>
                <span>{clickData?.code}</span>
            </div>

            <div className="  mt-6 text-sm font-normal text-gray-600">
            Pick a Color
          </div>
          <div className=" mt-3 flex gap-3">
            {clickData?.colors &&
              clickData?.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>{ setAddItem({ ...addItem, color: color }), setSelectedColor(color)}}
                    className={` w-8 h-8   rounded-full border  cursor-pointer    hover:border-black  ${color}  ${ color==selectedColor  ?'border-black' : 'border-slate-400'}`}
                  ></div>
                );
              })}
          </div>

            <div className="mt-1 md:mt-3 text-sm font-normal text-gray-600">
              Select Size
            </div>
            <div className=" mt-3 flex flex-wrap gap-2 pl-0 px-4">
            {clickData?.sizes &&
              clickData?.sizes.map((siz,index) => {
                return (
                  <div key={index}
                  onClick={() => {setAddItem({ ...addItem, size: siz }),setSelectedSize(siz)}}
                   className={`text-sm border-2 cursor-pointer border-gray-500 p-1 md:p-2 py-1 rounded transition duration-300 hover:bg-black hover:text-white hover:border-black ${siz===selectedSize && 'bg-black text-white border-black'}`}>
                    {siz}
                  </div>
                );
              })}
          </div>
            <div className="mt-3 md:mt-6 w-full flex flex-col gap-2">
                <div onClick={AddCardHandler} className="w-full text-center py-2 md:py-3 bg-black rounded cursor-pointer border text-white transition duration-500 hover:bg-white uppercase text-[12px] md:text-sm hover:border-black hover:text-black"  ><span>Add To Bag</span></div>
                <div className="w-full text-center py-2 md:py-3   uppercase  text-black border border-black transition duration-500 rounded text-[12px] md:text-sm cursor-pointer hover:bg-black hover:text-white"  ><span>Add To Whishlist</span></div>
            </div>

            <div className="hidden md:block text-sm mt-4 text-gray-500">
                To save this articles in your watchlist , <span className="text-black">LOGIN</span> or <span className=" text-black">SIGN IN </span>
                 on our web site
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
