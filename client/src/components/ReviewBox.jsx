import React, { useRef, useState } from "react";
import { FaArrowRight, FaCross } from "react-icons/fa6";
import Card from "./Card";
import ReactStars from "react-rating-stars-component";
import "swiper/css/free-mode";
import {
  Progress,
  Button,
  FileInput,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import { IoMdClose } from "react-icons/io";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const ReviewBox = ({ setShowCard, data }) => {
  const [tempFile, setTempFile] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isFinished, setFinished] = useState(false);
  const onchange = (val) => {
    setReviewData({ ...reviewData, stars: val });
  };
  const uploadImage = (e) => {
    const files = e.target.files[0];
    //  setTempFile(URL.createObjectURL(files));
    const storage = getStorage(app);
    const fileRef = ref(storage, new Date().getTime() + "_" + files.name);
    const uploadTask = uploadBytesResumable(fileRef, files);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(progress.toFixed(0));

        if (progress.toFixed(0) >= 100) {
          setFinished(false);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setTempFile(downloadUrl);
        });
      }
    );
  };

  const submitReview = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/product/addReview",
        {
          ...reviewData,
          photo: tempFile,
          userId: currentUser._id,
          postId: data?._id,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status == 200) {
        setShowCard(false);
        toast("Success,Admin team will submit", {
          icon: "🫣",
        });
        setReviewData(null);
        setTempFile(null);
      }
    } catch (error) {}
  };

  return (
    <div
      className=" fixed p-4 top-0 z-50 left-0  w-full h-full flex items-center justify-center overflow-y-auto "
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="w-full  md:max-w-[600px] h-auto  bg-white p-3 flex">
        <div className="w-full p-3 relative">
          <IoMdClose
            className=" absolute top-0 right-0 transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setShowCard(false)}
          />
          <div className=" text-xl font-semibold w-[90%]">GIVE REVIEWS</div>
          <div className=" cursor-pointer">
            <ReactStars
              count={5}
              value={0}
              size={40}
              activeColor="black"
              onChange={onchange}
            />
          </div>
          <div className=" mt-3">
            <Label>
              Write Headline <span className="text-red-400">*</span>
            </Label>
            <TextInput
              placeholder="Write Headline..."
              className="text-sm mt-2"
              onChange={(e) =>
                setReviewData({ ...reviewData, headLine: e.target.value })
              }
            />
          </div>
          <div className=" mt-3">
            <Label>
              Write Comment <span className="text-red-400">*</span>
            </Label>
            <Textarea
              placeholder="Your Comment.. "
              className="text-sm mt-2"
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
            />
          </div>
          <div className=" mt-3">
            <Label>Drop a photo</Label>
            <FileInput className=" mt-2" onChange={uploadImage} />
          </div>

          <div className=" mt-3">
            {uploadPercent < 100
              ? uploadPercent !== 0 &&
                uploadPercent !== 100 && (
                  <Progress
                    progress={uploadPercent}
                    textLabel="Uploading..."
                    progressLabelPosition="inside"
                    textLabelPosition="outside"
                    size="md"
                    className=" mt-2"
                    labelProgress
                    labelText
                  />
                )
              : tempFile && (
                  <img
                    className=" h-[200px] w-full object-cover"
                    src={tempFile}
                    alt=" not found"
                  />
                )}
          </div>

          <div className=" w-full flex justify-end">
            <Button color="dark" className=" mt-5" onClick={submitReview}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
