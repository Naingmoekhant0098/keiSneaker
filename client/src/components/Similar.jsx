import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "./Card";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import {
  FreeMode,
  Pagination,
  Navigation,
  EffectFade,
  Scrollbar,
} from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Controller } from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "swiper/css/free-mode";
import AddCard from "./AddCard";
import axios from "axios";
import { Link } from "react-router-dom";
const Similar = ({ endPoint }) => {
  const swp = useRef(null);
  const [activeIndex, setActiveInex] = useState(0);
  const [shoess, setShoess] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [clickData, setClickData] = useState(null);
  const breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  useEffect(() => {
    const serchData = async () => {
      try {
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/product/getProducts?&=brand
          =${endPoint}&order='desc'&limit=10`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setShoess(res.data.shoes);
        }
      } catch (error) {}
    };

    serchData();
  }, []);
  return (
    <div>
      <div className=" max-w-7xl mx-auto md:p-3 flex flex-col mt-10 md:px-2 px-5">
        <div className=" flex  mb-6 items-center justify-between">
          <h1 className=" text-2xl md:text-3xl font-semibold uppercase">
            Similar products
          </h1>
          <Link to={"/shops"}>
            <div className=" flex items-center gap-2 cursor-pointer group ">
              <span className=" text-[14px]">All Products</span>
              <FaArrowRight className=" transition duration-500 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        <div className=" relative w-full ">
          <Swiper
            modules={[Controller]}
            slidesPerView={2}
            spaceBetween={10}
            onBeforeInit={(swpp) => {
              swp.current = swpp;
            }}
            loop={true}
            breakpoints={breakpoints}
            onSlideChange={(ans) => setActiveInex(ans.activeIndex)}
            className=" text-md w-full h-auto tracking-wide "
          >
            {shoess &&
              shoess?.map((res, index) => {
                return (
                  <SwiperSlide className=" w-full  " key={index}>
                    <Card
                      setShowCard={setShowCard}
                      data={res}
                      setClickData={setClickData}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>

          <GrFormPrevious
            className={`absolute hidden md:block cursor-pointer  left-0 md:-left-10 bg-red z-30  text-5xl  `}
            onClick={() => swp?.current?.slidePrev()}
            style={{ top: "35%", transform: "translate(-50%" }}
          />
          <MdNavigateNext
            className={` absolute hidden md:block cursor-pointer -right-12 md:-right-20 bg-red z-30  text-5xl  `}
            onClick={() => swp?.current?.slideNext()}
            style={{ top: "35%", transform: "translate(-50%" }}
          />
        </div>
      </div>

      {showCard && <AddCard setShowCard={setShowCard} clickData={clickData} />}
    </div>
  );
};

export default Similar;
