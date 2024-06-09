import { Textarea } from "flowbite-react";
import React, { useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
const Disscussion = ({
  comment,
  setComment,
  submitHandler,
  data,
  setComments,
  setShowAuth
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const likeComment = async (id) => {
    if (!currentUser) {
      setShowAuth(true);
    }
    try {
      const likeResult = await axios.put(
        "https://keisneaker-8da6.onrender.com/product/likeComment",
        { commentId: id, userId: currentUser._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (likeResult.status === 200) {
        setComments(
          data.map((revv) =>
            revv._id === id
              ? {
                  ...revv,
                  likes: likeResult.data.review.likes,
                  unLikes: likeResult.data.review.unLikes,
                }
              : revv
          )
        );
      }
    } catch (error) {}
  };
  const unlikeComment = async (id) => {
    if (!currentUser) {
      setShowAuth(true);
    }
    try {
      const likeResult = await axios.put(
        "https://keisneaker-8da6.onrender.com/product/unLikeComment",
        { commentId: id, userId: currentUser._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (likeResult.status === 200) {
        setComments(
          data.map((revv) =>
            revv._id === id
              ? {
                  ...revv,
                  likes: likeResult.data.review.likes,
                  unLikes: likeResult.data.review.unLikes,
                }
              : revv
          )
        );
      }
    } catch (error) {}
  };

  const deleteComment = async (id) => {
    try {
      const res = await axios.get(
        `https://keisneaker-8da6.onrender.com/product/deleteComment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setComments(data?.filter((dt) => dt._id != id));
        toast.success("Deleted");
      }
    } catch (error) {}
  };

  const editHandler = async (id, text) => {
    try {
      const res = await axios.put(
        "https://keisneaker-8da6.onrender.com/product/editComment",
        {
          id: id,
          editText: text,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setComments(
          data?.map((dt) =>
            dt._id === id
              ? {
                  ...dt,
                  comment: text,
                }
              : dt
          )
        );
        toast.success("Edited");
      }
    } catch (error) {}
  };

  const submitReply = async (id, text) => {
    try {
      const res = await axios.post(
        "https://keisneaker-8da6.onrender.com/product/addReply",
        {
          id: id,
          reply: text,
          userId: currentUser._id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setComments(
          data?.map((dt) =>
            dt._id === id
              ? {
                  ...dt,
                  replies: res.data.comment.replies,
                }
              : dt
          )
        );
       
      }
    } catch (error) {}
  };

  const deleteReply= async(commentId , id)=>{
    try {
      const res = await axios.get(`https://keisneaker-8da6.onrender.com/product/deleteReply/${id}?commentId=${commentId}`,{
        headers : {'Content-Type' : 'application/json'},
        withCredentials : true
      })
       if(res.status ===200){
        setComments(data?.map((dt)=>dt._id===commentId ? {
          ...dt,
          replies : res.data.comment.replies
        }:dt))
       }
      
    } catch (error) {
      
    }
      // setComments(data?.map((cmt)=>cmt._id===commentId ? {
      //   ...cmt,
      //   replies : replies.filter((rp)=>rp!==id)
      // } : cmt))
  }

  return (
    <div>
      <h3 className=" text-xl font-medium">
        Disscussion{" "}
         
      </h3>
      <form className=" mt-6" onSubmit={submitHandler}>
        <Textarea
          placeholder="Write Disscussion Comment"
          rows={7}
          value={comment}
          onFocus={()=>{
            if(!currentUser){
              setShowAuth(true)
            }
          }}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className=" w-full flex justify-end  mt-5">
          <button
            type="submit"
            className=" border p-2 text-sm px-3 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
          >
            Submit
          </button>
        </div>
      </form>

      <div>
        {data?.map((comment, index) => {
          return (
            <Comment
              data={comment}
              key={index}
              likeComment={likeComment}
              unlikeComment={unlikeComment}
              deleteComment={deleteComment}
              editHandler={editHandler}
              submitReply={submitReply}
              deleteReply={deleteReply}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Disscussion;
