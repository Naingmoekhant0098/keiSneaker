import React, { useRef, useState } from "react";
import { FaArrowRight, FaCross } from "react-icons/fa6";
import Card from "./Card";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
 
import { MdNavigateNext } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "swiper/css/free-mode";
import { Button } from "flowbite-react";
import {IoMdClose} from "react-icons/io"
import Select from 'react-select';
import toast from "react-hot-toast";
const Guide = ({setGuide}) => {
  const [isShow,setIsShow] = useState(false);
  const[selectVal,setSelectedVal]=useState(null);
  const sizesCms =[
    {
      label : '20.8 cm' , value : {Us : 1 , Uk :5 ,Euro : 33}
    },
    {
      label : '21.1 cm' , value : {Us : 1.5 , Uk :5.5 ,Euro : 33.5}
    },
    {
      label : '21.5 cm' , value : {Us : 2 , Uk :6 ,Euro : 34}
    }, 

    {
      label : '21.8 cm' , value : {Us : 2.5 , Uk :1.5 ,Euro : 34.4}
    },
    {
      label : '22.1 cm' , value : {Us : 3 , Uk :2 ,Euro : 35}
    },
    {
      label : '22.5 cm' , value : {Us : 3.5 , Uk :2.5 ,Euro : 35.5}
    },
    
    {
      label : '22.8 cm' , value : {Us : 4 , Uk :3 ,Euro : 36}
    },
    {
      label : '23.1 cm' , value : {Us : 4.5 , Uk :3.5 ,Euro : 36.5}
    },
    {
      label : '23.5 cm' , value : {Us : 5 , Uk :4 ,Euro : 37}
    },
    {
      label : '23.8 cm' , value : {Us : 5.5 , Uk :4.5 ,Euro : 37.5}
    },
    {
      label : '24.1 cm' , value : {Us : 6 , Uk :5 ,Euro : 38}
    },
    {
      label : '24.5 cm' , value : {Us : 6.5 , Uk :5.5 ,Euro : 38.5}
    },
    {
      label : '24.8 cm' , value : {Us : 7 , Uk :6 ,Euro : 39}
    },
    {
      label : '25.1 cm' , value : {Us : 7.5 , Uk :6.5 ,Euro : 39.5}
    },
    {
      label : '25.5 cm' , value : {Us : 8 , Uk :7 ,Euro : 40}
    },
    {
      label : '25.8cm' , value : {Us : 8.5 , Uk :7.5 ,Euro : 40.5}
    },
    {
      label : '26.1 cm' , value : {Us : 9 , Uk :8 ,Euro : 41}
    },
    {
      label : '26.5 cm' , value : {Us : 9.5 , Uk :8.5 ,Euro : 41.5}
    },
    {
      label : '26.8 cm' , value : {Us : 10 , Uk :9 ,Euro : 42}
    },
    {
      label : '27.1 cm' , value : {Us : 10.5 , Uk :9.5 ,Euro : 42.5}
    },
    {
      label : '27.5 cm' , value : {Us : 11 , Uk :10 ,Euro : 43}
    },
    {
      label : '27.8 cm' , value : {Us : 7 , Uk :10.5 ,Euro : 43.5}
    },
    {
      label : '28.1 cm' , value : {Us : 8.5 , Uk :11 ,Euro : 44}
    },
    {
      label : '28.5 cm' , value : {Us : 9 , Uk :11.5 ,Euro : 44.5}
    },
    {
      label : '28.8 cm' , value : {Us : 9.5 , Uk :12 ,Euro : 45}
    },
    {
      label : '29.1 cm' , value : {Us : 10 , Uk :12.5 ,Euro : 45.5}
    },
    {
      label : '29.5 cm' , value : {Us : 10.5 , Uk :13 ,Euro : 46}
    },
  ]
   
const selectHandler = (selectedOption,action)=>{
  setSelectedVal(selectedOption.value)
}

const showHandler=()=>{
 
  if(!selectVal){
    toast.error('Please choose a size !')
  }else{
    setIsShow(!isShow)
  }
}

const hideHandler=()=>{
  setIsShow(false);
  setSelectedVal(null)
}
  
  return (
    <div
      className=" fixed top-0 z-50 left-0 p-4 md:p-0  w-full h-full flex items-center justify-center "
      style={{ background: "rgba(0,0,0,0.3)" }}
       
    >
      <div className="w-full  md:max-w-[900px] md:max-h-auto bg-white p-3 py-4 flex">
         
        <div className="w-full p-3 relative">
        <IoMdClose
            className=" absolute top-0 right-0 transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
            onClick={()=>setGuide(false)}
          />
            <div className="mt-3 md:mt-4 w-full flex flex-col gap-2">
                <h2 className=" text-center font-bold text-3xl uppercase">Men & Woman Footware size guide</h2>
            </div>
            <div className="  md:w-2/3 my-2 text-center mx-auto text-[14px]">
            Measure foot from back of heel to longest toe and select the measurement below. Click continue, and we'll do the rest.
            </div>
            <div className="  flex items-center justify-center ">
              <img src="/guide.png" alt="" className=" h-52 w-ful" />

            </div>
            <div className="md:w-2/3 mx-auto -mt-4">
               {
                isShow ? (
                  <div className=" text-center"> 
                  <div className=" text-lg font-semibold">Here your shoe size is :</div>
                  {
                    selectVal && <div className=" flex items-center justify-center gap-3 mt-2">
                      <div className=" flex items-center justify-center gap-1"><span className=" text-xl font-semibold">
                      {Object.keys(selectVal)[0]} -
                        </span>
                        <span>{selectVal.Us}</span>
                        </div>
|
                        <div className=" flex items-center justify-center gap-1"><span className=" text-xl font-semibold">
                      {Object.keys(selectVal)[1]} -
                        </span>
                        <span>{selectVal.Uk}</span>
                        </div>
                        |

                        <div className=" flex items-center justify-center gap-1"><span className=" text-xl font-semibold">
                      {Object.keys(selectVal)[2]} -
                        </span>
                        <span>{selectVal.Euro}</span>
                        </div>

                      </div>
                  }
                  </div>
                ) :(
                  <Select 
                  options={sizesCms}
                  onChange={selectHandler}
                  menuPlacement="top"
                   
                  />
                )
               }
            </div>

            <div className=" mt-4 w-full flex items-center justify-center">
               {
                isShow ? (
                  <div >
                    <button className="mr-2 border border-black  p-2 rounded-md text-[14px]" onClick={hideHandler}>
                  Try Again 
                 
             </button>

             <button className=" bg-black text-white p-2 rounded-md text-[14px]" onClick={hideHandler}>
                   Shop The Size
                 
             </button>
                    </div>
                ) :(
                  <button className=" bg-black text-white p-2 rounded-md text-[14px]" onClick={showHandler}>
                  Continue 
                 
             </button>
                )
               }
            </div>


             
        </div>
      </div>
    </div>
  );
};

export default Guide;
