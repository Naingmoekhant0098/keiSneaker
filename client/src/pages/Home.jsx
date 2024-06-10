import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Controller } from "swiper/modules";
import "swiper/css/free-mode";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";
import ShopCat from "../components/ShopCat";
import NewArr from "../components/NewArr";
import DisSection from "../components/DisSection";
import Keyfeatures from "../components/Keyfeatures";
import Stock from "../components/Stock";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShopHeigh from "../components/ShopHeigh";
const Home = ({ setShowAuth }) => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [controlledSwiper1, setControlledSwiper1] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const nextRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (currentUser) {
      Cookies.set("access_token", currentUser.token);
    }
  }, [currentUser]);

  const shoes = [
    {
      name: "Air Jordan 1 Retro High OG ",
      price: 180,
      Image: "air-jordan-1-retro-high-og-black-white-mens-shoes-JHpxkn (1).png",
      type: "Air Jordan 1",
      desc: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with a crisp upper and refreshing colour combos. Channelling vintage style back onto the streets, its padded, low-cut collar lets you take your game anywhere—in comfort.",
    },
    {
      name: "Air Jordan 1 Retro High OG",
      price: 180,
      Image: "air-jordan-1-low-womens-shoes-rJrHLw.png",
      type: "Air Jordan 1",
      desc: "The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.",
    },
    {
      name: "Air Jordan 1 Low",
      price: 115,
      Image: "air-jordan-1-retro-high-og-latte-womens-shoes-Dw2wdP (2).png",
      type: "Air Jordan 1",
      desc: "Created for the hardwood but taken to the streets, the '80s b-ball icon returns with a crisp upper and refreshing colour combos. Channelling vintage style back onto the streets, its padded, low-cut collar lets you take your game anywhere—in comfort.",
    },
    {
      name: "Air Jordan 1 Retro High OG Latte",
      price: 180,
      Image: "air-jordan-1-retro-high-og-mens-shoes-JHpxkn (1).png",
      type: "Air Jordan 1",
      desc: "The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.",
    },
  ];

  return (
    <div>
      <div className=" max-w-7xl mx-auto max-h-auto md:h-[80vh] mt-24       flex relative flex-col md:flex-row    px-3 ">
        {/* //leftSection */}

        <div className=" w-full  md:w-1/2 h-auto   flex flex-col   p-5    text-center md:text-left md:items-center  justify-center   ">
          <div className="  md:mt-16 md:pt-2 w-3/4 m-auto   ">
            <div className=" text-[20px] font-semibold capitalize border-b-2 border-black inline ">
              New In
            </div>
            <div>
              <Swiper
                modules={[Controller]}
                onSwiper={setControlledSwiper}
                direction="vertical"
                controller={{ control: controlledSwiper1 }}
                className="text-3xl md:text-4xl max-h-[110px] 0   md:h-40 tracking-wide  font-bold mt-6  mb-3 text-swiper"
              >
                {shoes.map((shoe, index) => {
                  return (
                    <SwiperSlide key={index} className="">
                      <div
                        className=" title cursor-pointer uppercase "
                        style={{ letterSpacing: 0.5 }}
                      >
                        {shoe.name}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="inline border-l-4 pl-2 border-black text-[16px] font-medium ">
              Unisex High Top Shoe
            </div>
            <div className=" text-[18px] font-bold mb-10 mt-4">
              <span className=" line-through opacity-75 mr-3"> $ 150</span>{" "}
              <span> $126</span>
            </div>
            <div className=" w-full flex justify-center md:justify-start">
              <Link className="" to={'/shops'}> 
              <div className=" w-36 border border-black px-2 py-2  transition duration-500 flex items-center  justify-center cursor-pointer hover:bg-black hover:text-white">
                <span className=" font-medium mr-2">Shop Now</span>
                <FaArrowRight className="" />
              </div>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[900px] flex items-center justify-center md:justify-between  md:right-64 bottom-0 absolute md:gap-8  ">
            <div className=" flex font-medium text-center mr-12 md:mr-0 ">
              <span>0{currentSlide + 1}</span>
              <span>-</span>
              <span>0{shoes.length}</span>
            </div>
            <div className=" hidden md:flex   ">
              <FaArrowLeft
                className=" bg-black text-white w-14 h-10 text-sm p-3 cursor-pointer"
                onClick={() => nextRef.current?.slidePrev()}
              />
              <FaArrowRight
                className="   w-14 h-10 text-sm p-3 transition duration-300 cursor-pointer hover:bg-black hover:text-white"
                onClick={() => nextRef.current?.slideNext()}
              />
            </div>
          </div>
        </div>

        {/* rghtSection */}

        <div className="w-full md:w-1/2 h-full">
          <Swiper
            controller={{ control: controlledSwiper }}
            centeredSlides={true}
            grabCursor={true}
            effect="fade"
            modules={[Pagination, Navigation, Controller, EffectFade]}
            onBeforeInit={(swiper) => {
              nextRef.current = swiper;
            }}
            onSlideChange={(sp) => setCurrentSlide(sp.activeIndex)}
          >
            {shoes.map((shoe, index) => {
              return (
                <SwiperSlide className=" flex justify-center p-4 md:p-4    ">
                  <div className="relative">
                    <div
                      className={`bg_circle w-[400px] h-[400px] md:w-[550px] md:h-[550px]  shadow-lg   rounded-full bg-circle-img no${index}`}
                    ></div>
                    {/* <div className="bg_circle w-56 md:w-56 h-56  md:h-56 z-0 shadow-lg  bg-cyan-300 rounded-full bg-circle-img absolute bottom-0 -left-24"></div> */}
                    <img
                      src={`/${shoe.Image}`}
                      alt="not found"
                      className={` w-[400px] md:w-[550px]  absolute -left-14 md:-left-[5rem]  -top-20  z-20  imagesss `}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div className=" logos relative  mt-10 md:mt-20  mb-6  cursor-pointer max-w-5xl mx-auto">
        <Swiper
          modules={[Controller, Navigation]}
          slidesPerView={4}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          // const brands = [
          //   { value: "nike", label: "Nike" },
          //   { value: "addidas", label: "Addidas" },
          //   { value: "H&M", label: "H&M" },
          //   { value: "vans", label: "Vans" },
          //   { value: "gucci", label: "Gucci" },
          //   { value: "converse", label: "Converse" },
          //   { value: "the north face", label: "The north face" },
          //   { value: "prada", label: "Prada" },
          // ];
          className="  w-full h-full pl-4 md:pl-0  dess tracking-wide"
        >
          <SwiperSlide className="">
            <Link to={'/shops?brands=nike'}>
            <img
              src="/pngegg.png"
              className=" w-[90px]  md:w-[120px] h-[70px]  mix-blend-multiply"
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=gucci'}>
            <img
              src="/gucci-4.svg"
              className="w-[90px]  md:w-[130px] h-[70px]"
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=converse'}>
            <img
              src="/Converse.svg"
              className="w-[80px]  md:w-[130px] h-[70px]go"
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=H&M'}>
            <img
              src="/hm-logo-black-and-white.png"
              className="w-[80px]  md:w-[130px] h-[60px]"
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=jordan'}>
            <svg
              aria-hidden="false"
              className="w-[80px]  md:w-[130px] h-[70px]"
              focusable="false"
              viewBox="4 2.5 16 17"
              role="img"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z"
              ></path>
            </svg>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=prada'}>
            <img
              src="/prada-logo-1.svg"
              className="w-[80px]  md:w-[130px] h-[70px]"
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className=" scale-100">
          <Link to={'/shops?brands=the north face'}>
            <img
              src="/pngegg (1).png"
              className="w-[80px]  md:w-[130px] h-[80px] "
            />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="">
          <Link to={'/shops?brands=vans'}>
            <img
              src="/pngegg (2).png"
              className="w-[80px]  md:w-[130px] h-[80px]"
            />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>

      <ShopCat />
      <NewArr setShowAuth={setShowAuth} />

      <DisSection />
      <Stock setShowAuth={setShowAuth} />
      <ShopHeigh />
      <Keyfeatures />
    </div>
  );
};

export default Home;
