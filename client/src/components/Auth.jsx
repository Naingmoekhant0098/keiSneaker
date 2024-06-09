import React, { useRef, useState } from "react";
import { FaArrowRight, FaCross } from "react-icons/fa6";
import Card from "./Card";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Checkbox, FloatingLabel, Label } from "flowbite-react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import "swiper/css/effect-fade";
import { Controller } from "swiper/modules";
import { MdNavigateNext } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "swiper/css/free-mode";
import { Button } from "flowbite-react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-date-picker";
 
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFail,
  signInFail,
  signInStart,
} from "../Slice/UserSlice";
const Auth = ({ setShowAuth }) => {
  const [tab, setTab] = useState("login");
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [loginData, setLoginData] = useState(null);
  const dispatch = useDispatch();
  const notify = (stat, message) => {
    if (stat === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const onChangee = (e) => {
    setData({ ...data, birthday: e.toString() });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      !data.lastName ||
      !data.firstName ||
      !data.email ||
      !data.password ||
      !data.birthday
    ) {
      notify("error", "Please fill all requred field");
      dispatch(signUpFail("Please fill all requred field"));
    }
    dispatch(signUpStart());
    try {
      const ress = await axios.post("https://keisneaker-8da6.onrender.com/sign-up", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (ress.status !== 200) {
        dispatch(signUpFail("Fail to sign in"));
      }

      if (ress.status === 200) {
        dispatch(signUpSuccess(ress.data.user));
        setShowAuth(false);
        setData(null);
        notify("success", "Sign Up Success");
      }
    } catch (error) {
      dispatch(signUpFail(error.message));
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const ress = await axios.post(
        "https://keisneaker-8da6.onrender.com/sign-in",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (ress.status === 404) {
        dispatch(signInFail("Fail to sign in"));
        toast.error("User not found");
      }

      if (ress.status === 200) {
        dispatch(signUpSuccess(ress.data.user));
        setShowAuth(false);
        setLoginData(null);
        notify("success", "Sign In Success");
      }
    } catch (error) {
      dispatch(signInFail(error.message));
      toast.error("User not found");
    }
  };

  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      if (resultFromGoogle) {
        const res = await axios.post(
          "https://keisneaker-8da6.onrender.com/sign-with-google",
          {
            email: resultFromGoogle.user.email,
            username: resultFromGoogle.user.displayName,
            profile: resultFromGoogle.user.photoURL,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
       
        if (res.status === 404) {
          dispatch(signInFail("Fail to sign in"));
          toast.success("Fail to sign in");
        }

        if (res.status === 200) {
          dispatch(signUpSuccess(res.data.user));
          setShowAuth(false);

          toast.success("Sign In Success");
        }
      }
    } catch (error) {
      toast.success("Fail to sign in");
    }
  };
  return (
    <div
      className="  fixed top-0 z-50 p-4 md:p-0 w-full h-full flex items-center justify-center overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="w-[500px] relative min-h-[600px] bg-white p-6 ">
        <IoMdClose
          className=" absolute top-2 right-2 transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
          style={{ width: "40px", height: "40px" }}
          onClick={() => setShowAuth(false)}
        />
        <div className=" mt-4 flex gap-4 font-semibold text-xl">
          <div
            className={`text-black  opacity-70 cursor-pointer ${
              tab === "login" && " border-b-2 opacity-100 border-black "
            }`}
            onClick={() => setTab("login")}
          >
            SIGN IN
          </div>
          <div
            className={`text-black  opacity-70 border-black cursor-pointer ${
              tab === "signin" && " opacity-100 border-b-2 border-black"
            }`}
            onClick={() => setTab("signin")}
          >
            SIGN UP
          </div>
        </div>
        {tab === "login" ? (
          <div className=" mt-4 ">
            <h1 className=" text-xl font-medium tracking-wide">
              Get all access from our sneaker store benefits.
            </h1>
            <form
              action=""
              className=" mt-10 flex flex-col gap-8"
              onSubmit={loginSubmitHandler}
            >
              <FloatingLabel
                variant="standard"
                label="Email"
                required
                type="email"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <div>
                <FloatingLabel
                  variant="standard"
                  label="Password"
                  required
                  type="password"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <div className=" flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="promotion" />
                    <Label
                      htmlFor="promotion"
                      className=" text-gray-500 text-sm font-normal"
                    >
                      Remember Me
                    </Label>
                  </div>
                  <span className=" text-sm cursor-pointer underline">
                    Forget Password
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-center py-3 bg-black rounded cursor-pointer border text-white transition duration-500 hover:bg-white uppercase text-sm hover:border-black hover:text-black"
                >
                  <span>Sign In</span>
                </button>
                <div className="text-center mt-3">
                  <span className=" text-sm text-center">
                    {" "}
                    Not a member ?{" "}
                    <span className=" font-semibold cursor-pointer">
                      SIGN UP
                    </span>
                  </span>
                </div>
                <div class="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                  OR
                </div>
                <div
                  className="w-full text-center py-3 text-sm uppercase  text-black border border-black transition duration-500 rounded cursor-pointer hover:bg-black hover:text-white flex items-center justify-center gap-2 mt-3"
                  onClick={signInWithGoogle}
                >
                  <FaGoogle className=" text-lg" />
                  <span>sing in with google</span>
                </div>
              </div>
              <div className="text-center  w-80 mx-auto">
                <div className=" text-[12px] ">
                  By creating an account in kei sneaker and I agree with{" "}
                  <span className=" underline font-semibold cursor-pointer">
                    Term Of Use
                  </span>{" "}
                  &{" "}
                  <span className=" underline font-semibold cursor-pointer">
                    Privacy Policy.
                  </span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className=" mt-4">
            <h1 className=" text-xl font-medium tracking-wide">
              Become a special member to get more benefits
            </h1>
            <form
              className=" mt-5 flex flex-col gap-8"
              onSubmit={signUpHandler}
            >
              <div className="flex items-center">
                <span
                  className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
                    step >= 1 && "bg-black text-white"
                  }`}
                  onClick={() => setStep(1)}
                >
                  1
                </span>
                <span
                  className={` h-[2px] w-10 bg-gray-500 ${
                    step >= 1 && "bg-black"
                  }`}
                ></span>
                <span
                  className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
                    step >= 2 && "bg-black text-white"
                  }`}
                  onClick={() => setStep(2)}
                >
                  2
                </span>
                <span
                  className={` h-[2px] w-10 bg-gray-500 ${
                    step >= 1 && "bg-black"
                  }`}
                ></span>
                <span
                  className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
                    step >= 3 && "bg-black text-white"
                  }`}
                  onClick={() => setStep(3)}
                >
                  3
                </span>
                <span
                  className={` h-[2px] w-10 bg-gray-500 ${
                    step >= 1 && "bg-black"
                  }`}
                ></span>
                <span
                  className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
                    step >= 4 && "bg-black text-white"
                  }`}
                  onClick={() => setStep(4)}
                >
                  4
                </span>
              </div>
              {step === 1 && (
                <div>
                  <div className=" capitalize  mb-6">
                    The first step to unlocking all the perks: enter your email
                    address below.
                  </div>
                  <FloatingLabel
                    variant="standard"
                    type="email"
                    label="Email"
                    required
                    value={data?.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <button
                    disabled={!data?.email && true}
                    className={`w-full mt-8 text-center py-3 bg-black rounded   border text-white transition cursor-not-allowed duration-500 ${
                      data?.email &&
                      "hover:bg-white hover:border-black hover:text-black cursor-pointer"
                    }  uppercase text-sm `}
                    onClick={() => setStep(step + 1)}
                  >
                    <span>NEXT</span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className=" capitalize  mb-6">
                    The Second step to unlocking all the perks: Choose your
                    username below.
                  </div>
                  <div className="flex gap-4 w-full">
                    <div className="w-1/2">
                      <FloatingLabel
                        variant="standard"
                        label="First Name"
                        required
                        value={data?.firstName}
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="w-1/2">
                      <FloatingLabel
                        variant="standard"
                        label="Last Name"
                        required
                        value={data?.lastName}
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <button
                    disabled={!data?.firstName && !data?.lastName && true}
                    className={`w-full mt-8 text-center py-3 bg-black rounded   border text-white transition cursor-not-allowed duration-500 ${
                      data?.firstName &&
                      data?.lastName &&
                      "hover:bg-white hover:border-black hover:text-black cursor-pointer"
                    }  uppercase text-sm `}
                    onClick={() => setStep(step + 1)}
                  >
                    <span>NEXT</span>
                  </button>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className=" capitalize  mb-6">
                    Almost Done : enter your date of birth below.
                  </div>
                  {/* <FloatingLabel
                    variant="standard"
                    type="data"
                    label="Date of birth"
                    required
                    value={data?.birthday}
                    onChange={(e) =>
                      setData({ ...data, birthday: e.target.value })
                    }
                  /> */}
                  <DatePicker
                    className="w-full flex items-center"
                    onChange={onChangee}
                    value={data?.birthday}
                  />

                  <button
                    disabled={!data?.birthday && true}
                    className={`w-full mt-8 text-center py-3 bg-black rounded   border text-white transition cursor-not-allowed duration-500 ${
                      data?.birthday &&
                      "hover:bg-white hover:border-black hover:text-black cursor-pointer"
                    }  uppercase text-sm `}
                    onClick={() => setStep(step + 1)}
                  >
                    <span>NEXT</span>
                  </button>
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className=" capitalize  mb-6">
                    To protect you information : enter your password below.
                  </div>
                  <div>
                    <FloatingLabel
                      variant="standard"
                      label="Password"
                      required
                      type="password"
                      value={data?.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                    <div className=" flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="promotion" />
                        <Label
                          htmlFor="promotion"
                          className=" text-gray-500 text-sm font-normal"
                        >
                          Remember Me
                        </Label>
                      </div>
                      <span className=" text-sm cursor-pointer underline">
                        Forget Password
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`w-full mt-8 text-center py-3 bg-black rounded   border text-white transition cursor-not-allowed duration-500 ${
                      data?.email &&
                      data?.password &&
                      data?.firstName &&
                      data?.lastName &&
                      data?.birthday &&
                      "hover:bg-white hover:border-black hover:text-black cursor-pointer"
                    }  uppercase text-sm `}
                  >
                    <span>SIGN UP</span>
                  </button>
                </div>
              )}

              <div className=" -mt-5">
                <div className="text-center">
                  <span className=" text-sm text-center">
                    {" "}
                    Not a member ?{" "}
                    <span className=" font-semibold cursor-pointer">
                      SIGN UP
                    </span>
                  </span>
                </div>
                <div class="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                  OR
                </div>
                <div
                  className="w-full text-center py-3 text-sm uppercase  text-black border border-black transition duration-500 rounded cursor-pointer hover:bg-black hover:text-white flex items-center justify-center gap-2 mt-3"
                  onClick={signInWithGoogle}
                >
                  <FaGoogle className=" text-lg" />
                  <span>sing in with google</span>
                </div>
              </div>
              <div className="text-center  w-80 mx-auto">
                <div className=" text-[12px] ">
                  By creating an account in kei sneaker and I agree with{" "}
                  <span className=" underline font-semibold cursor-pointer">
                    Term Of Use
                  </span>{" "}
                  &{" "}
                  <span className=" underline font-semibold cursor-pointer">
                    Privacy Policy.
                  </span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
