import axios from "axios";
import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";
import moment from "moment";
import { useSelector } from "react-redux";
const Rev = ({ data ,likeReview , unLikeReview}) => {
  const {currentUser} = useSelector((state)=>state.user)
  const [user, setUser] = useState();
   
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/getUsers?userId=${data.userId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setUser(res.data.users[0]);
        }
      } catch (error) {}
    };
    fetchUser();
  }, [data]);
  return (
    <>
    <div className="  w-full  my-3 p-3 px-5 rounded-lg ">
       
      <div className=" flex-1">
        <div>
          <div className=" flex items-center gap-2">
            <div className="text-sm -mb-1">{user?.username} </div>
            <div className=" text-[12px] -mb-1 opacity-80">
              {moment(data?.createdAt).fromNow()}
            </div>
          </div>
          <div className=" h-8">
            <ReactStars
              count={5}
              value={data?.stars}
              size={25}
              edit={false}
              activeColor="black"
              onChange={onchange}
            />
          </div>
        </div>

        <div className=" text-lg  font-medium my-1">{data?.headLine}</div>
        <div className="text-[16px]  font-normal">{data?.comment}</div>
        {
            data?.photo && (
                <img src={data?.photo}  className="mt-3 object-cover h-[300px]"/>
            )
        }

        <div className=" flex items-center gap-5 mt-6">
          <span className=" text-[16px]">Was this review helpful to you?</span>
          <div className=" flex gap-3">
            <div className=" flex items-center gap-2">
              <LuThumbsUp onClick={()=>likeReview(data?._id)} className={`text-2xl cursor-pointer  hover:text-black ${data?.likes.includes(currentUser?._id)?'text-black' : 'text-gray-600'}`}/>
              <span>{data.likes.length}</span>
            </div>
            <div className=" flex items-center gap-2">
              <LuThumbsDown onClick={()=>unLikeReview(data?._id)}  className={`text-2xl cursor-pointer  hover:text-black ${data?.unLikes.includes(currentUser?._id)?'text-black' : 'text-gray-600'}`}/>
              <span>{data.unLikes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr /></>

  );
};

export default Rev;
