import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewBox from "./ReviewBox";
import { useSelector } from "react-redux";
import moment from "moment";
import Rev from "./Rev";
import { Progress } from "flowbite-react";
import axios from "axios";
const Review = ({ setShowAuth, data, setShowCard, showCard }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [reviews, setReviews] = useState(null);
  const [five, setFive] = useState(0);
  const [four, setFour] = useState(0);
  const [three, setThree] = useState(0);
  const [two, setTwo] = useState(0);
  const [one, setOne] = useState(0);
  useEffect(() => {
    const fetchReveiw = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/product/getReview?postId=${data._id}&isSubmit=submited`
        );
        

        if (res.status === 200) {
          setReviews(res.data.reviews);
          setFive(res.data.five);
          setFour(res.data.four);
          setThree(res.data.three);
          setTwo(res.data.two);
          setOne(res.data.one);
        }
      } catch (error) {}
    };

    fetchReveiw();
  }, []);

  const likeReview = async (id) => {
    if(!currentUser){
      setShowAuth(true)
    }
    try {
      const likeResult = await axios.put(
        "http://localhost:3000/product/likeReview",
        { reviewId: id, userId: currentUser._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (likeResult.status === 200) {
        setReviews(
          reviews.map((revv)=>revv._id === id ? {
            ...revv,
            likes : likeResult.data.review.likes,
            unLikes : likeResult.data.review.unLikes
          } : revv)
        );
         
      }
    } catch (error) {}
  };
  const unLikeReview = async(id) => {
    if(!currentUser){
      setShowAuth(true)
    }
    try {
      const likeResult = await axios.put(
        "http://localhost:3000/product/unLikeReview",
        { reviewId: id, userId: currentUser._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (likeResult.status === 200) {
        setReviews(
          reviews.map((revv)=>revv._id === id ? {
            ...revv,
            likes : likeResult.data.review.likes,
            unLikes : likeResult.data.review.unLikes
          } : revv)
        );
        
      }
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <h3 className=" text-xl font-medium">Review Snapshot</h3>

        <div className=" flex items-center justify-between">
          <div className=" flex items-center md:gap-6 gap-3">
            <div>
              <ReactStars
                count={5}
                size={30}
                edit={false}
                value={4}
                activeColor="black"
              />
            </div>
            <div className=" opacity-65 text-sm">
              {reviews?.length} {reviews?.length > 1 ? "Reviews" : "Review"}
            </div>
          </div>
          {currentUser ? (
            <div
              onClick={() => setShowCard(true)}
              className="text-[14px] md:text-[16px]  border-b-2   transition duration-500 cursor-pointer  border-black"
            >
              Write A Comment
            </div>
          ) : (
            <div
              onClick={() => setShowAuth(true)}
              className=" text-[16px]  border-b-2   transition duration-500 cursor-pointer pb-1 border-black"
            >
              Write A Comment
            </div>
          )}
        </div>

        <div className=" mt-2">
          <div className=" font-medium">RATINGS DISTRIBUTION</div>
          <div className=" flex flex-col gap-1 mt-3">
            <div className=" flex items-center gap-4">
              <span>5 stars</span>
              <Progress
                progress={
                  reviews?.length > 0
                    ? ((five / reviews?.length) * 100).toFixed(0)
                    : 0
                }
                size="md"
                color="dark"
                className="  w-52 md:w-72"
              />
              <span>{five}</span>
            </div>
            <div className=" flex items-center gap-4">
              <span>4 stars</span>
              <Progress
                progress={
                  reviews?.length > 0
                    ? ((four / reviews?.length) * 100).toFixed(0)
                    : 0
                }
                size="md"
                color="dark"
                className="  w-52 md:w-72"
              />
              <span>{four}</span>
            </div>
            <div className=" flex items-center gap-4">
              <span>3 stars</span>
              <Progress
                progress={
                  reviews?.length > 0
                    ? ((three / reviews?.length) * 100).toFixed(0)
                    : 0
                }
                size="md"
                color="dark"
                className="  w-52 md:w-72"
              />
              <span>{three}</span>
            </div>
            <div className=" flex items-center gap-4">
              <span>2 stars</span>
              <Progress
                progress={
                  reviews?.length > 0
                    ? ((two / reviews?.length) * 100).toFixed(0)
                    : 0
                }
                size="md"
                color="dark"
                className="w-52 md:w-72"
              />
              <span>{two}</span>
            </div>
            <div className=" flex items-center gap-4">
              <span className="mr-1">1 stars</span>
              <Progress
                progress={
                  reviews?.length > 0
                    ? ((one / reviews?.length) * 100).toFixed(0)
                    : 0
                }
                size="md"
                color="dark"
                className="  w-52 md:w-72"
              />
              <span>{one}</span>
            </div>
          </div>
        </div>

        <div className=" mt-5">
          {reviews &&
            reviews.map((rev, index) => {
              return (
                <Rev
                  key={index}
                  data={rev}
                  likeReview={likeReview}
                  unLikeReview={unLikeReview}
                />
              );
            })}
        </div>
      </div>

      {showCard && <ReviewBox setShowCard={setShowCard} data={data} />}
    </div>
  );
};

export default Review;
