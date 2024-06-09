import { Avatar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiQuestionMarkCircle,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserCircle,
} from "react-icons/hi2";

import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
import { useSelector } from "react-redux";
import { BsBox2Heart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { Button, Drawer, Sidebar } from "flowbite-react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { signOut } from "../Slice/UserSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Nav = ({ setShowAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleClose = () => setIsOpen(false);
  const { currentUser, userCart } = useSelector((state) => state.user);
  const [backDrop, setBackDrop] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState("topNav");
  const[showSearch,setShowSearch]= useState(false)
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setBackDrop(false);
        setIsOpen(false);
      } else {
        setBackDrop(true);
      }
    });
  }, [window.innerWidth]);
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    query.set("searchTerm", searchTerm);
    setShowSearch(false)
    navigate(`/shops?searchTerm=${searchTerm}`);
  };
  const scrollController = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > scrollY) {
        setShowNav("hideNav");
      } else {
        setShowNav("showNav");
      }

      setScrollY(window.scrollY);
    } else {
      setShowNav("topNav");
    }
  };
  

  useEffect(() => {
    window.addEventListener("scroll", scrollController);
  }, [scrollY]);
  return (
    <>
      <div
        className={` fixed right-0  transition-all duration-500 top-0 left-0  z-20 flex items-center justify-between px-2 md:px-4 py-2 md:py-2  border-b border-gray-200 ${showNav}`}
      >
        <div className=" hidden md:block">
          <div className=" flex items-center  gap-8 cursor-pointer">
          <Link to={'/'}>
            <div className="py-2 px-2 font-[500] transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
              Home
            </div>
            </Link>
            <Link to={"/shops?category=men"}>
              <div className="py-2 px-2 font-[500] transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                Men
              </div>
            </Link>
            <Link to={"/shops?category=women"}>
              <div className="py-2 px-2 font-[500] transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                Women
              </div>
            </Link>

            <Link to={"/shops?category=kids"}>
              <div className="py-2 px-2 font-[500] transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                Kids
              </div>
            </Link>
          </div>
        </div>
        <div>
          <Link to={"/"}>
            <svg
              aria-hidden="false"
              className="_2eprOjqm"
              focusable="false"
              viewBox="4 2.5 16 17"
              role="img"
              width="91px"
              height="50px"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z"
              ></path>
              <title>jordan</title>
            </svg>
          </Link>
        </div>
        <div className=" flex items-center    gap-0 md:gap-4">
          <div className={` absolute md:relative  overflow-hidden bg-white  px-3 md:px-0  right-0 md:right-0  top-[70px] py-4 md:top-0 w-full md:w-auto  md:block ${showSearch ? 'block' : 'hidden'}`}>
            <CiSearch
              className=" absolute z-10 top-0 left-4 md:left-1 h-full   cursor-pointer     p-2  rounded-lg"
              style={{ fontSize: "40px" }}
            />
            {/* <TextInput   placeholder="Search..." className="searchBtn text-base hidden md:block" /> */}
            <form action="" onSubmit={searchHandler} className=" flex items-center gap-3">
              <input
                className="searchBtn p-2 py-3  rounded-full text-sm bg-gray-100 w-full"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="block md:hidden border p-2 text-sm rounded-lg border-black px-3 cursor-pointer" onClick={()=>setShowSearch(false)}>Cancel</div>
            </form>
          </div>
          <CiSearch
            className=" mr-2   block md:hidden transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
            onClick={()=>setShowSearch(!showSearch)}
          />
          {/* <HiOutlineHeart
            className=" hidden md:block transition duration-300 cursor-pointer hover:bg-black hover:text-white   p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
          /> */}

          <Link to={"/shoppingCart"}>
            <div className=" relative  ">
              <HiOutlineShoppingBag
                className=" transition    duration-300 cursor-pointer hover:bg-black   hover:text-white p-2  rounded-lg"
                style={{ width: "40px", height: "40px" }}
              />
              <div className=" absolute -top-1 right-0 bg-white inline   rounded-full w-4   text-center text-[12px]">
                {userCart?.length || 0}
              </div>
            </div>
          </Link>

          {currentUser ? (
            <Dropdown
              color={"grey"}
              label={
                <>
                  <Avatar
                    img={currentUser?.profile}
                    alt="avatar of Jese"
                    className="hidden md:block"
                    rounded
                  />
                  <FiUser
                    className="block -mx-3   md:hidden transition duration-300 cursor-pointer hover:bg-black hover:text-white  p-2  rounded-lg"
                    style={{ width: "40px", height: "40px" }}
                  />
                </>
              }
              className="mt-0 md:mt-2 px-0 md:px-1"
              arrowIcon={false}
            >
              <Dropdown.Header className="py-1">
                <span className="block text-sm font-semibold">
                  {currentUser.username}
                </span>
                <span className="block truncate   font-medium text-center opacity-75 text-sm">
                  {currentUser.email.substr(0, 15)}
                  {currentUser.email.length > 15 && "..."}
                </span>
              </Dropdown.Header>
              {currentUser?.isAdmin && (
                <Link to={"/dashboard?tab=dash"}>
                  <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                </Link>
              )}
              <Dropdown.Item className=" text-md flex gap-2">
                <HiOutlineUserCircle className=" text-lg" />
                <span className="text-sm">Profile</span>
              </Dropdown.Item>
             <Link to={'/wishlists'}>
             <Dropdown.Item className=" text-md flex gap-2">
                <HiOutlineHeart className=" text-lg" />
                <span className="text-sm">Whistlist</span>
              </Dropdown.Item>
             </Link>
              <Dropdown.Divider />
              <Dropdown.Item
                className="text-sm"
                icon={HiLogout}
                onClick={() => {
                  dispatch(signOut());
                  toast.success("Success logout");
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div
              className=" border mx-2 p-2 px-4 transition duration-300 cursor-pointer   border-black text-sm rounded-full hover:text-white hover:bg-black"
              onClick={() => setShowAuth(true)}
            >
              Sign In
            </div>
          )}

          <HiOutlineBars3BottomLeft
            className="  block md:hidden transition duration-300 cursor-pointer hover:bg-black hover:text-white  text-4xl p-2  rounded-lg"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="block md:hidden "
        backdrop={backDrop}
      >
        <Drawer.Header
          className=" drawBtn"
          title="KEI SNEAKER SHOP"
          titleIcon={() => <></>}
        />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col item  py-2">
              <div className="">
                <div className=" flex flex-col items-start px-4  gap-4 cursor-pointer">
                  <Link to={"/"}>
                    <div className=" font-[500]  py-2 px-2 transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                      Home
                    </div>
                  </Link>
                  <Link to={"/shops?category=men"}>
                    <div className="   font-[500] py-2 px-2 transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                      Men
                    </div>
                  </Link>
                  <Link to={"/shops?category=women"}>
                    <div className=" font-[500] py-2 px-2 transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                      Woman
                    </div>
                  </Link>
                  <Link to={"/shops?category=kids"}>
                    <div className=" font-[500] py-2 px-2 transition duration-300 border-b-2 border-b-transparent  text-base hover:border-black">
                      Kids
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-5 px-4">
              <p>
                Become a member of kei sneaker store for the newest and best
                sneakers
                <span className=" font-semibold ms-4 cursor-pointer">
                  Learn More
                </span>
              </p>
              <div className="flex  gap-3 mt-3">
                <Button
                  color={"gray"}
                  pill
                  className="  bg-black text-white rounded-full"
                >
                  Join Now
                </Button>
                <Button className="" color={"gray"} pill outline>
                  Sign Up
                </Button>
              </div>
            </div>

            <div className=" flex flex-col gap-5 mt-10 px-4">
              <Link to={"/shoppingCart"}>
                <div className="py-2 px-2 flex items-center gap-2 cursor-pointer">
                  <HiOutlineShoppingBag className=" text-2xl" />
                  <span className=" font-[500]">Bag</span>
                </div>
              </Link>
              <Link to={"/orders"}>
                <div className="py-2 px-2 flex items-center gap-2">
                  <BsBox2Heart className=" text-xl" />
                  <span className=" font-[500]">Orders</span>
                </div>
              </Link>
              <div className="py-2 px-2 flex items-center gap-2">
                <HiOutlineQuestionMarkCircle className=" text-2xl" />
                <span className=" font-[500]">Help</span>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Nav;
