import axios from "axios";
import { Avatar, Textarea } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LuThumbsUp } from "react-icons/lu";
import { LuThumbsDown } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Reply from "./Reply";
const Comment = ({
  data,
  likeComment,
  unlikeComment,
  deleteComment,
  editHandler,
  submitReply,
  deleteReply,
}) => {
  const [user, setUser] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [editText, setEditText] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/getUsers?userId=${data?.userId}`,
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
    <div className=" flex gap-3 mb-6 w-full ">
      <div className=" flex flex-col h-auto items-center ">
        <Avatar img={user?.profile} rounded size={"sm"} />
        <span className=" w-2 h-full   border-l-2 my-1 ml-2 "></span>
      </div>

      <div className=" flex-1 pr-6">
        <h1 className=" font-medium text-sm">
          {user?.username} .{" "}
          <span className=" font-light text-[12px]">
            {moment(data?.createdAt).fromNow()}
          </span>
        </h1>

        <div className=" text-sm my-2">
          {isEdit ? (
            <div>
              <Textarea
                defaultValue={data?.comment}
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
                    editHandler(data?._id, editText), setIsEdit(false);
                  }}
                  className=" mt-2 border p-2 text-[12px] px-2 rounded cursor-pointer transition duration-300  border-black hover:bg-black hover:text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <span> {data?.comment}</span>
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
            {currentUser._id === data?.userId && (
              <span
                className=" text-[12px] cursor-pointer font-medium text-slate-500 hover:text-black"
                onClick={() => setIsEdit(!isEdit)}
              >
                Edit
              </span>
            )}

            {currentUser._id === data?.userId && (
              <span
                className=" text-[12px] cursor-pointer font-medium text-slate-500 hover:text-black"
                onClick={() => deleteComment(data?._id)}
              >
                Delete
              </span>
            )}
          </div>
          <div className=" flex items-center gap-3 ">
            <div className=" flex items-center gap-1 cursor-pointer text-xl ">
              <LuThumbsUp
                className={` hover:text-black ${
                  data?.likes.includes(currentUser?._id)
                    ? "text-black"
                    : "text-slate-500"
                }`}
                onClick={() => likeComment(data?._id)}
              />
              <span className="text-[14px]">{data?.likes.length}</span>
            </div>
            <div className=" flex items-center gap-1 cursor-pointer text-xl">
              <LuThumbsDown
                className={` hover:text-black ${
                  data?.unLikes.includes(currentUser?._id)
                    ? "text-black"
                    : "text-slate-500"
                }`}
                onClick={() => unlikeComment(data?._id)}
              />
              <span className="text-[14px]">{data?.unLikes.length}</span>
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
                  submitReply(data?._id, reply),
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
        {hide &&
          data?.replies?.map((rp, index) => {
            return (
              <Reply
                data={rp}
                key={index}
                cmtId={data?._id}
                deleteReply={deleteReply}
                submitReply={submitReply}
              />
            );
          })}
        {data?.replies.length > 0 && hide ? (
          <span
            className=" cursor-pointer text-[12px] flex items-center gap-2"
            onClick={() => setHide(false)}
          >
            <span>Hide {data?.replies.length} replies </span>
            <FaChevronUp />
          </span>
        ) : (
          <span
            className={`cursor-pointer text-[12px] flex items-center gap-2 ${data?.replies.length==0 ? 'hidden' : 'block'}`}
            onClick={() => setHide(true)}
          >
            <span>View {data?.replies.length} replies </span>
            <FaChevronDown />
          </span>
        )}
      </div>
    </div>
  );
};

export default Comment;
