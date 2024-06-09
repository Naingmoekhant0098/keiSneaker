import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WatchListCard = ({ id,user,setClickData,setShowCard,setUser }) => {
  const [data, setData] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ress = await axios.get(
          `http://localhost:3000/product/getProducts?productId=${id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      
        if (ress.status === 200) {
          setData(ress.data.shoes[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);
  const addToWatchList = async (id) => {
    if (!currentUser) {
      setShowAuth(true);
    }

    try {
      const resData = await axios.put(
        `http://localhost:3000/user/addWatchlist`,
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
 

  return (
    <div  className="  md:w-72  cursor-pointer">
      <div className=" relative group ">
        <Link to={`/shop/${data?.slug}`}>
          <img
            src={data?.photos[0]}
            alt=""
            className="w-full h-[250px] md:h-[350px] object-cover"
          />

          <img
            src={data?.photos[1]}
            alt=""
            className="w-full h-full object-cover transition duration-500 absolute top-0 opacity-0 group-hover:opacity-100"
          />
        </Link>
        <HiOutlineHeart
          className={` rounded-full p-[2px]  absolute top-3 right-3 text-2xl transition duration-500 cursor-pointer md:hover:scale-125 ${
            user &&
            user?.watchLists?.includes(data?._id) &&
            " bg-black text-white"
          }`}
          onClick={() => addToWatchList(data?._id)}
        />
        <div className=" hidden md:block">
          <span
            className="absolute   transition duration-500  bottom-3 right-5 flex items-center gap-2  px-2 py-2 opacity-0 group-hover:opacity-100 bg-white hover:bg-black hover:text-white
                  "
            onClick={() => {
              setShowCard(true), setClickData(data);
            }}
          >
            <span className=" border-r-2 border-gray-500 px-2 text-sm font-medium">
              Add To Bag
            </span>

            <HiOutlineShoppingBag className="  text-xl cursor-pointer " />
          </span>
        </div>
      </div>
      <div className=" px-2">
        <div className=" mt-2 text-[16px] font-semibold w-full text-wrap hover:underline cursor-pointer line-clamp-2">
          {data?.name}
        </div>
        <div className=" mt-1 text-sm font-medium text-gray-900">
          <span
            className={` ${
              data?.isOnSale && "line-through opacity-70 text-sm"
            }`}
          >
            ${data?.price}
          </span>
          {data?.isOnSale && <span className="ms-3">${data?.onSalePrice}</span>}
        </div>
        <div
          className="  mt-1 font-medium text-gray-600 uppercase"
          style={{ fontSize: "10px" }}
        >
          {data?.category} {data?.heigh} shoe
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
