import React, { useEffect, useState } from "react";
import { Breadcrumb } from "flowbite-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";
import axios from "axios";
import { Accordion } from "flowbite-react";
import "swiper/css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import required modules
import { Controller, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Disscussion from "../components/Disscussion";
import Reviews from "./Reviews";
import Review from "../components/Review";
import Stock from "../components/Stock";
import NewArr from "../components/NewArr";
import Similar from "../components/Similar";
import { useSelector } from "react-redux";
import { FiTruck } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Shipping from "../components/Shipping";
import { RxRulerHorizontal } from "react-icons/rx";
import AddCard from "../components/AddCard";
import Guide from "../components/Guide";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slice/UserSlice";
import toast from "react-hot-toast";
const Detail = ({ setShowAuth }) => {
  const [showCard, setShowCard] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState(null);
  const [size, setSize] = useState(false);
  const dispatch = useDispatch();
  const [addItem, setAddItem] = useState(null);
  const [selectedColor,setSelectedColor] = useState();
  const[selectedSize , setSelectedSize] = useState();
  

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const rest = await axios.get(
        `https://keisneaker-8da6.onrender.com/user/getUsers?userId=${currentUser?._id}`
      );
      if (rest.status == 200) {
        setUser(rest.data.users[0]);
      }
    };
    fetchUser();
  }, [currentUser]);
  const addToWatchList = async (id) => {
    if (!currentUser) {
      setShowAuth(true);
    }

    try {
      const resData = await axios.put(
        `https://keisneaker-8da6.onrender.com/user/addWatchlist`,
        { postId: id, userId: currentUser?._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (resData.status === 200) {
        setUser({ ...user, watchLists: resData.data.user.watchLists });
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    if (showCard) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCard]);
  const { slug } = useParams();
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/product/getProducts?slug=${slug}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setData(res.data.shoes[0]);
          setAddItem({
            _id: res.data.shoes[0]?._id,
            slug: res.data.shoes[0]?.slug,
            name: res.data.shoes[0]?.name,
            price: res.data.shoes[0]?.price,
            code: res.data.shoes[0]?.code,
            short_description: res.data.shoes[0]?.short_description,
            ribbon: res.data.shoes[0]?.ribbon,
            photos: res.data.shoes[0]?.photos,
            size: res.data.shoes[0]?.sizes[0],
            category: res.data.shoes[0]?.category,
            brand: res.data.shoes[0]?.brand,
            color: res.data.shoes[0]?.colors[0],
            collect: res.data.shoes[0]?.collect,
            isOnSale: res.data.shoes[0]?.isOnSale,
            onSalePrice: res.data.shoes[0]?.onSalePrice,
            onSalePercentage: res.data.shoes[0]?.onSalePercentage,
            heigh: res.data.shoes[0]?.heigh,
            qty: 1,
          });
        }
      } catch (error) {}
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/product/getComments/${data?._id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setComments(res.data.comments);
        }
      } catch (error) {}
    };
    fetchComment();
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowAuth(true);
    }
   if(comment){
    try {
      const ress = await axios.post(
        "https://keisneaker-8da6.onrender.com/product/addComment",
        { userId: currentUser, postId: data._id, comment: comment },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (ress.status === 200) {
        setComments((prev) => [ress.data.comment, ...prev]);
        setComment("");
      }
    } catch (error) {}
   }
  };
  const AddCardHandler = () => {
    if (qty !== 0) {
      dispatch(addToCart({...addItem , qty : qty}));
      toast('Item added',{
        icon :'🥂'
      })
      setQty(1)
    }
  };

  return (
    <div className="mt-24  w-full md:max-w-7xl mx-auto  flex flex-col">
      <div className="px-5 md:px-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
          
          <Breadcrumb.Item>Sneakers</Breadcrumb.Item>
          <Breadcrumb.Item>{data?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" flex gap-3 w-full mt-5 flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-0 md:p-6 ">
          <Swiper
            navigation={true}
            spaceBetween={0}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Controller]}
            className="mySwiper2 h-[450px] md:h-[500px] w-full md:w-[580px]  after:"
          >
            {data?.photos &&
              data?.photos.map((pt, i) => {
                return (
                  <SwiperSlide key={i}>
                    <img
                      src={pt}
                      className="rounded w-full h-full object-cover"
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper mt-4 h-[100px] md:h-[130px] px-3 md:px-2"
          >
            {data?.photos &&
              data?.photos.map((pt) => {
                return (
                  <SwiperSlide className=" h-full w-[250px]">
                    <img
                      src={pt}
                      className="rounded-md cursor-pointer w-full object-cover h-full border-2 border-white"
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h1 className=" text-2xl font-semibold mt-0" style={{letterSpacing:1.5}}>{data?.name}</h1>
          <div className=" text-sm mt-2  text-gray-500 hidden md:block">
            <span>CODE : </span>
            <span>{data?.code}</span>
          </div>
          <div className=" mt-2 font-medium text-lg">
            <span
              className={` ${
                data?.isOnSale && "line-through opacity-70 text-sm"
              }`}
            >
              ${data?.price}
            </span>
            {data?.isOnSale && (
              <span className="ms-3">${data?.onSalePrice}</span>
            )}
          </div>
          <div className=" mt-2 text-[12px] font-semibold text-gray-500 capitalize">
            {data?.category}    {data?.heigh} shoe
          </div>
          <div className=" w-full md:w-3/4 mt-2 text-sm font-medium ">
            {data?.short_description}
          </div>

          <div className="  mt-6 text-sm font-normal">
            Pick a Color
          </div>
          <div className=" mt-3 flex gap-3">
            {data?.colors &&
              data?.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>{ setAddItem({ ...addItem, color: color }), setSelectedColor(color)}}
                    className={` w-8 h-8   rounded-full border  cursor-pointer    hover:border-black  ${color}  ${ color==selectedColor  ?'border-black' : 'border-slate-400'}`}
                  ></div>
                );
              })}
          </div>

          <div className=" w-full md:w-3/4 flex items-center justify-between  mt-6 text-sm font-normal ">
            <span className="text-gray-600">Select Size</span>
            <span
              onClick={() => setSize(true)}
              className=" cursor-default flex items-center gap-2 border-b-2 border-black"
            >
              <RxRulerHorizontal className="text-xl" /> <span>Size Guide</span>
            </span>
          </div>
          <div className=" w-full md:w-3/4  mt-3 flex flex-wrap gap-2 pl-0 px-4">
            {data?.sizes &&
              data?.sizes.map((siz, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {setAddItem({ ...addItem, size: siz }),setSelectedSize(siz)}}
                    className={`text-sm border-2 cursor-pointer border-gray-500 p-2 py-1 rounded transition duration-300 hover:bg-black hover:text-white hover:border-black ${siz===selectedSize && 'bg-black text-white border-black'}`}
                  >
                    {siz}
                  </div>
                );
              })}
          </div>

          <div className="  mt-6 text-sm font-normal text-gray-600">
            Pick a Quantity
          </div>
        <div className=" flex items-center gap-4">
        <div className="mt-3 flex items-center gap-2">
            <FaMinus
              className="   border border-gray-400   transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-3  rounded-lg"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setQty((prev) => prev > 0 && prev - 1)}
            />
            <div>
              <input
                type="number"
                min="1"
                max="20"
                value={qty}
                
                className=" text-center border-none rounded w-24 bg-slate-200 focus:border-none focus:outline-none"
              />
            </div>
            <FaPlus
              className="   border border-gray-400   transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-3  rounded-lg"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setQty((prev) => prev + 1)}
            />
          </div>

          <div className=" text-sm text-red-500">
           {
            data?.ItemsQty &&  data?.ItemsQty-qty <4 ? (
              data?.ItemsQty-qty > 0 ?  ` Only ${ data?.ItemsQty-qty} Items left` : 'Out of stock'
            ) : ''
           }
            
          </div>
        </div>
          
          <div className="mt-8 md:mt-8 w-full flex flex-col gap-3">
            <div
              onClick={AddCardHandler}
              className={`w-full md:w-3/4 text-center py-2 md:py-3 bg-black rounded   border text-white transition duration-500 hover:bg-white uppercase text-[16px] md:text-sm hover:border-black hover:text-black flex items-center justify-center gap-2 ${
                qty === 0 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <HiOutlineShoppingBag className=" text-xl" />
              <span>Add To Bag</span>
            </div>
            <div className={`w-full md:w-3/4 text-center py-2 md:py-3   uppercase  text-black border border-black transition duration-500 rounded text-[16px] md:text-sm cursor-pointer md:hover:bg-black md:hover:text-white flex items-center justify-center gap-2 ${
            user && user?.watchLists?.includes(data?._id) && " bg-black text-white"
          }`} onClick={()=>addToWatchList(data?._id)}>
              <HiOutlineHeart className=" text-xl" />
              <span>Add To Whishlist</span>
            </div>
          </div>
          <div className=" w-full md:w-3/4 flex items-center gap-3 px-8 py-3 bg-slate-100 mt-4 rounded-md">
            <IoMdCheckmarkCircleOutline className=" text-2xl" />
            <div>
              <div className=" text-sm font-semibold">
                100% original products
              </div>
            </div>
          </div>
          <div className=" w-full md:w-3/4 flex items-center gap-3 px-8 py-3 bg-slate-100 mt-4 rounded-md">
            <FiTruck className=" text-2xl" />
            <div>
              <div className=" text-sm font-semibold">
                Free Standard Delivery
              </div>
              <div className=" text-sm opacity-85 mt-1">
                On all online orders $300 and over
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      <div className="w-full md:w-1/2  px-4 ">
        <Tabs className={''}>
          <TabList className="tab border-b-2 text-[16px] md:text-base">
            <Tab className="tb w-1/3 text-center font-semibold">Description</Tab>
            
            <Tab className="tb  w-1/3 text-center font-semibold">Reviews</Tab>
            <Tab className="tb  w-1/3 text-center font-semibold">Discussion</Tab>
          </TabList>

          <TabPanel className={"dess"}>
            <div
              className="p-3 mt-2"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </TabPanel>
           
          <TabPanel>
            <div className="p-3 mt-2">
              <Review
                setShowAuth={setShowAuth}
                data={data}
                setShowCard={setShowCard}
                showCard={showCard}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="p-3 mt-2">
              <Disscussion
                submitHandler={submitHandler}
                comment={comment}
                setComment={setComment}
                setShowAuth={setShowAuth}
                data={comments}
                setComments={setComments}
              />
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <Similar endPoint={data?.brand} />
      <NewArr />

      {size && <Guide setGuide={setSize} />}
    </div>
  );
};

export default Detail;
