import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Overview from "./Overview";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { IoBugSharp } from "react-icons/io5";
import { LiaBoxesSolid } from "react-icons/lia";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbStars } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import SideBar from "./SideBar";
import Products from "./Products";
import Order from "./Order";
import Users from "./Users";
import Reviews from "./Reviews";
import Reports from "./Reports";
import { useDispatch, useSelector } from "react-redux";
import {Toaster} from 'react-hot-toast'
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { signOut } from "../Slice/UserSlice";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("dash");
  const [show, setShow] = useState(false);
  const [isDrop,setIsDrop]= useState(false)
const {currentUser} = useSelector((state)=>state.user)
  useEffect(() => {
    const tb = new URLSearchParams(location.search);
    if (tb) {
      setTab(tb.get("tab"));
    }
  }, [location.search]);
  const dispatch = useDispatch();

  return (
    <div>   <Toaster/>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end ">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => setShow(!show)}
                class="block md:hidden items-center p-2 text-sm text-gray-500 rounded-lg   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" class="flex md:ms-14  ">
                <svg
                  aria-hidden="false"
                  focusable="false"
                  viewBox="4 2.5 16 17"
                  role="img"
                  fill="none"
                  className=" w-14 h-10 md:w-20 md:h-12"
                >
                  <path
                    fill="currentColor"
                    d="M13.182 3.733c-.012-.039-.012-.039-.012-.072a.966.966 0 01.922-1.007.97.97 0 011.007.922.964.964 0 01-.917 1.007c-.027.004-.062 0-.101 0-.016.004-.04.004-.056.022-.056.084.14.073-.005.44 0 0 0 .038-.012.077-.012.14-.08.562-.096.793.029.04.04.05.029.13a6.003 6.003 0 01-.09.534c-.04.14-.096.174-.147.202-.073.298-.095.545-.281.905-.022.276-.045.35-.106.484-.017.4.01.46-.281 1.101-.08.3-.017.507.05.821.068.321.276.461.298.793.05.771.017 1.305-.163 1.907l.135.348c.18.084.618.326.36.675.343.19.865.394 1.28.781.176.147.35.315.513.5.316.057.276.08.506.231.675.438 1.749 1.304 2.373 1.906.112.067.147.112.236.163.01.023.017.034.01.04-.026.072-.026.072-.06.14.039.04.095.073.134.107.04.005.04-.006.096-.017.079.073.18.135.214.135.106-.022.084-.005.185-.1.029-.035.084 0 .084 0 .04-.04.113-.119.214-.176.079-.045.23-.045.23-.045.052.006.04.051.029.073-.057.023-.18.057-.247.108-.152.14-.276.353-.276.353.299-.033.484.045.719.023.136-.005.237.006.377-.09 0 0 .14-.096.265-.14.118-.05.23-.017.33.062.069.084.119.084 0 .196-.044.045-.1.096-.18.17-.133.123-.313.291-.5.432a3.11 3.11 0 01-.527.315c-.338.23-.26.174-.523.394-.03.022-.124.078-.163.106-.107.062-.135.006-.197-.118 0 0-.028-.045-.08-.14-.05-.107-.09-.23-.072-.23-.062-.007-.331-.344-.331-.41-.063-.013-.304-.26-.31-.31l-.214-.18c-.253.044-.31-.113-.961-.608-.08-.006-.197-.05-.36-.174-.298-.253-1.007-.815-1.124-.883-.13-.067-.281-.134-.383-.214-.146-.022-.218-.05-.298-.067-.08-.022-.14-.057-.326-.079-.303-.045-.618-.18-.911-.337-.14-.073-.264-.107-.382-.169-.27-.124-.506-.236-.686-.28a2.148 2.148 0 01-.568-.226c-.061-.034-.095-.06-.134-.073-.09-.022-.153.006-.192.022-.23.108-.438.203-.636.31-.18.09-.348.186-.528.286a7.971 7.971 0 01-.534.254s-.534.253-.832.348c-.26.197-.787.546-1.107.715-.158.073-.467.252-.608.292-.08.061-.371.258-.596.421-.18.124-.31.231-.31.231-.106.084-.101.13-.28.045a1.491 1.491 0 00-.13.096c-.14.095-.146.073-.202.067-.101.08-.113.04-.197.13-.061.084 0 .061-.118.106-.028.006-.04.04-.057.056-.094.073-.1.293-.325.304-.135.09-.107.203-.197.191 0 .102-.18.23-.214.23-.292.096-.304-.118-.646.035-.045.016-.113.072-.197.084-.152.022-.332-.006-.444-.102a1.93 1.93 0 01-.326-.398c-.051-.13-.017-.208.163-.332.073-.045.084-.079.208-.084.06-.024.045.01.15-.024.064-.016.064-.005.193-.005.028-.017.067-.022.124-.045.1-.034.196-.062.196-.062s.028-.023.124-.01c.078-.035.169-.08.214-.097-.012-.124.005-.124.06-.174.08-.062.09-.05.148-.01.022-.007.039-.013.027-.035-.01-.073-.061-.107-.045-.247-.022-.057-.061-.129-.05-.174.01-.045.028-.069.056-.079.029-.012.045.006.057.022.028.034.05.135.05.135.006.118.04.26.152.18.067-.062.084-.242.214-.203l.096.085c.084-.073.084-.073.14-.107 0 0-.08-.073-.012-.135.045-.039.108-.067.208-.175.276-.292.422-.42.714-.657a6.811 6.811 0 011.699-.939c.146-.174.28-.286.585-.304.377-.606 1.085-1.136 1.248-1.22.134-.23.19-.208.365-.247.135-.107.175-.107.23-.214.063-.23-.112-.86.383-.877.112-.146.078-.112.196-.248a2.19 2.19 0 01-.118-.5c-.005-.016-.196-.157-.13-.332a2.33 2.33 0 01-.268-.432.202.202 0 01-.063-.012c-.022-.005-.055-.005-.09-.005-.078.196-.163.208-.303.253-.26.512-.35.731-1.046 1.142-.28.298-.382.64-.382.634a.46.46 0 00-.012.321c-.045.107-.027.124-.027.124.01.045.056.106.106.112.079.023.169.023.158.118-.011.113-.163.09-.237.073-.275-.05-.185-.23-.365-.174-.141.085-.196.348-.416.31-.028-.023-.017-.074.006-.119.028-.06.084-.118.056-.14-.146.04-.433.123-.433.123-.135.04-.281-.039-.147-.124.063-.022.153-.05.265-.118 0 0 .062-.072-.057-.039a1.144 1.144 0 01-.416.045s-.257-.039-.292-.056c-.028-.022-.061-.107.017-.1a2.71 2.71 0 00.563-.068c.095-.035.28-.14.382-.186 0 0 .113-.157.18-.19.107-.114.19-.18.28-.299.09-.18.192-.46.5-.906a4.16 4.16 0 01.535-.646s.062-.338.343-.573c.063-.14.157-.31.259-.462a1.7 1.7 0 00.106-.168c.09-.13.186-.377.518-.41 0 0 .147-.102.197-.175.084-.073.074-.186.14-.259-.106-.106-.365-.309-.382-.573a.85.85 0 01.265-.692c.196-.185.398-.275.646-.258.309.055.366.157.455.258.09.101.13.04.163.146.259.073.248.045.237.236.045.057.106.108.1.214.085-.175.108-.208.344-.399.062-.157.1-.315.15-.478.052-.146.114-.298.154-.41-.04-.326.06-.377.196-.664-.022-.039-.016-.05-.006-.112.057-.192.136-.433.186-.596 0 0 .017-.063.085-.063.06-.202.157-.579.179-.663.062-.208.029-.287-.01-.41-.012-.04-.006-.09-.03-.136a5.483 5.483 0 01-.19-.41c-.028-.073-.08-.354-.08-.354-.004-.062-.004-.09-.004-.09z"
                  ></path>
                  <title>jordan</title>
                </svg>
              </a>
            </div>
            <div class="flex items-center ">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={()=>setIsDrop(!isDrop)}
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src={currentUser?.profile}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  class={`z-50 absolute my-4 right-6 top-16 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${isDrop ? 'block' : 'hidden'}`}
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                     {currentUser?.username}
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {
                        currentUser?.email.substr(0,15)
                        
                      }
                      {
                        currentUser?.email.length > 15 && '....'
                      }
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li  
                       onClick={()=> {
                        dispatch(signOut());
                         
                       
                    }}>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        class={`fixed top-0 left-0  z-40 w-52 md:w-56  h-screen pt-24 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          !show ? "-translate-x-full" : ""
        }`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-4 font-medium">
            <li className=" ">
              <Link
                to={"/dashboard?tab=dash"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "dash" && "bg-gray-100"
                }`}
              >
                <LuLayoutDashboard className=" text-xl" />
                <span class="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard?tab=products"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "products" && "bg-gray-100"
                }`}
              >
                <LiaBoxesSolid className=" text-xl" />

                <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard?tab=orders"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "orders" && "bg-gray-100"
                }`}
              >
                <FiShoppingBag className=" text-xl" />

                <span class="flex-1 ms-3 whitespace-nowrap">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard?tab=users"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "users" && "bg-gray-100"
                }`}
              >
                <TbUsersGroup className=" text-xl" />
                <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard?tab=reviews"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "reviews" && "bg-gray-100"
                }`}
              >
                <BiMessageSquareDetail className=" text-xl" />

                <span class="flex-1 ms-3 whitespace-nowrap">Reviews</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard?tab=reports"}
                class={`flex items-center p-2 px-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  tab === "reports" && "bg-gray-100"
                }`}
              >
                <IoBugSharp className=" text-xl" />
                <span class="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4  sm:ml-64">
        {tab === "dash" && <Overview />}
        {tab === "products" && <Products />}
        {tab === "orders" && <Order />}
        {tab === "users" && <Users />}
        {tab === "reviews" && <Reviews />}
        {tab === "reports" && <Reports />}
        {tab === "addProduct" && <AddProduct />}
        {tab === "editProduct" && <EditProduct />}
      </div>
    </div>
  );
};

export default Dashboard;
