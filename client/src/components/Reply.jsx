import axios from 'axios';
import { Avatar, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";
const Reply = ({data,deleteReply,cmtId , submitReply}) => {
    const {currentUser} = useSelector((state)=>state.user)
    const [replies ,setReplies] = useState(null);
    const [user,setUser] = useState(null);
    const [isEdit,setIsEdit] = useState(false)
    const[isReply,setIsReply] = useState(false)
    const [editText ,setEditText]= useState('')
    const [reply,setReply]=useState('')
    useEffect(()=>{
        const fetchReply =async()=>{
            const res = await axios.get(`https://keisneaker-8da6.onrender.com/product/getReply/${data}`,{
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            })

           if(res.status===200){
            setReplies(res.data.reply);
           }
        }
fetchReply();
    },[data])

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.get(
              `https://keisneaker-8da6.onrender.com/user/getUsers?userId=${replies?.userId            }`,
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
      }, [replies]);

    
const likeReply =async(id)=>{
    if (!currentUser) {
        setShowAuth(true);
      }
      try {
        const likeResult = await axios.put(
          "https://keisneaker-8da6.onrender.com/product/likeReply",
          { commentId: id, userId: currentUser._id },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        
        if (likeResult.status === 200) {
         setReplies(replies._id === id && {
            ...replies,
            likes : likeResult.data.review.likes,
            unLikes : likeResult.data.review.unLikes,

         })
        }
      } catch (error) {}
}
const unlikeReply=async(id)=>{
    if (!currentUser) {
        setShowAuth(true);
      }
      try {
        const likeResult = await axios.put(
          "https://keisneaker-8da6.onrender.com/product/unLikeReply",
          { commentId: id, userId: currentUser._id },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        
        if (likeResult.status === 200) {
         setReplies(replies._id === id && {
            ...replies,
            likes : likeResult.data.review.likes,
            unLikes : likeResult.data.review.unLikes,

         })
        }
      } catch (error) {}
}

const  editHandler=async(id)=>{
  
  try {
    const likeResult = await axios.put(
      "https://keisneaker-8da6.onrender.com/product/editReply",
      { replyId: id, text : editText},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    
    if (likeResult.status === 200) {
     setReplies(replies._id === id && {
        ...replies,
         reply : editText

     })
    }
  } catch (error) {}
   
}

      
  return (
    <div className=" flex gap-3 mb-6 w-full mt-3">
    <div className=" flex flex-col h-auto items-center ">
      <Avatar img={user?.profile} rounded size={"sm"} />
      <span className=" w-2 h-full   border-l-2 my-1 ml-2 "></span>
    </div>

    <div className=" flex-1 pr-6">
      <h1 className=" font-medium text-sm">
        {user?.username} .{" "}
        <span className=" font-light text-[12px]">
          {moment(replies?.createdAt).fromNow()}
        </span>
      </h1>

      <div className=" text-sm my-2">
        {isEdit ? (
          <div>
            <Textarea
              defaultValue={replies?.reply}
              rows={2}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className=" w-full flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEdit(false);
                }}
                className=" mt-2 border p-2 text-[12px] px-2 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
              >
                Cancle
              </button>
              <button
                onClick={() => {
                  editHandler(replies?._id, editText), setIsEdit(false);
                }}
                className=" mt-2 border p-2 text-[12px] px-2 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <span> {replies?.reply}</span>
        )}
      </div>

      <div className=" flex items-center justify-between w-full ">
        <div className=" flex  items-center gap-3">
          <span
            className=" text-[12px] cursor-pointer font-medium text-slate-500 hover:text-black"
            onClick={() => setIsReply(!isReply)}
          >
            Reply
          </span>
          {currentUser._id === replies?.userId && (
            <span
              className=" text-[12px] cursor-pointer font-medium text-slate-500 hover:text-black"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </span>
          )}

          {currentUser._id === replies?.userId && (
            <span
              className=" text-[12px] cursor-pointer font-medium text-slate-500 hover:text-black"
              onClick={() => deleteReply(cmtId,replies?._id)}
            >
              Delete
            </span>
          )}
        </div>
        <div className=" flex items-center gap-3 ">
          <div className=" flex items-center gap-1 cursor-pointer text-lg ">
            <LuThumbsUp
              className={` hover:text-black ${
                replies?.likes.includes(currentUser?._id)
                  ? "text-black"
                  : "text-slate-500"
              }`}
              onClick={() => likeReply(replies?._id)}
            />
            <span className="text-[14px]">{replies?.likes.length}</span>
          </div>
          <div className=" flex items-center gap-1 cursor-pointer text-lg">
            <LuThumbsDown
              className={` hover:text-black ${
                replies?.unLikes.includes(currentUser?._id)
                  ? "text-black"
                  : "text-slate-500"
              }`}
              onClick={() => unlikeReply(replies?._id)}
            />
            <span className="text-[14px]">{replies?.unLikes.length}</span>
          </div>
        </div>
      </div>
      {isReply && (
          <div className=" mt-2">
            <Textarea
              placeholder="Write a reply"
              className=" text-[13px] py-1"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className=" flex justify-end gap-2">
              <button
                onClick={() => setIsReply(false)}
                className=" mt-2 border p-2 text-[12px] px-2 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
              >
                Cancle
              </button>
              <button
                onClick={() => {
                  submitReply(cmtId, reply),
                    setIsReply(false),
                    setReply("");
                }}
                className=" mt-2 border p-2 text-[12px] px-2 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
              >
                Submit
              </button>
            </div>
          </div>
        )}

     
      
      
    </div>
  </div>
  )
}

export default Reply