import axios from "axios";
import { Table } from "flowbite-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HiOutlineEye } from "react-icons/hi";

const OrderTable = ({ data }) => {
  const [od, setOrder] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ress = await axios.get(
          `https://keisneaker-8da6.onrender.com/order/getOrders?orderId=${data}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(ress)

        if (ress.status === 200) {
          setOrder(ress.data.orders[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [data]);
  return (
    <div className=" shadow bg-slate-100 p-4 border border-slate-400  border-dashed rounded-lg">
      <div className=" flex items-center justify-between pb-2  ">
        <div className=" text-[14px]">
          <div> #{data}</div>
          <div className=" opacity-80">
            Placed On {moment(od?.createdAt).format("ll")}
          </div>
        </div>
        <Link to={`/orders/${od?._id}`} className=" flex items-center gap-2 cursor-pointer">
          <HiOutlineEye />
          <div className=" hidden md:block text-sm">View Order Detail</div>
          <div className=" block md:hidden text-sm">View Detail</div>
        </Link>
      </div>
      <hr />
      <div className=" flex pt-2">
        <div className=" flex-1">
          {od?.products &&
            od?.products.map((pt) => {
              return (
                <div className=" flex mt-6 gap-3 md:gap-6 ">
                 <Link to={`/orders/${od?._id}`}>
                 <img
                    src={pt?.photos[0]}
                    alt=""
                    className=" w-36 h-30 md:w-42 md:h-42 object-cover rounded-md"
                  />
                 </Link>
                  <div>
                    <div className=" uppercase font-semibold text-sm md:text-[14px] opacity-50">
                      {pt?.brand}
                    </div>
                    <div className=" font-medium mb-0">{pt?.name}</div>
                    <div className=" flex   flex-col">
                      <div className="text-[12px]   md:text-[14px] opacity-75">
                        {pt?.category}
                      </div>
                      <div className="text-[12px] md:text-[14px] opacity-75">
                        <span>Size :</span>
                        {pt?.size} ,<span> Color :</span> {pt?.color}
                      </div>
                      <div className="text-[12px]  md:text-[14px] opacity-75">
                        <span>Qty : </span>
                        {pt?.qty}
                      </div>
                      <div className="text-[12px]  md:text-[14px] opacity-75">
                        <span>Price : </span>${pt?.qty * pt?.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className=" flex-2  pt-2 flex  md:pr-4">
          <div className=" flex flex-col items-center">
            <div className=" flex gap-2">
              <div className=" flex items-center flex-col w-10">
                <div className=" border-2 border-slate-500 p-[1px] rounded-full">
                  <div
                    className={`w-3 h-3 md:w-5 md:h-5 rounded-full ${
                      od?.status === "Pending" ||
                      od?.status === "Confirmed" ||
                      od?.status === "Shipping" ||
                      od?.status === "Delivered"
                        ? "bg-black text-white"
                        : ""
                    } `}
                  ></div>
                </div>
                <span className=" h-10 w-[2px] bg-black"></span>
              </div>

              {/* <div className=" text-sm">Pending</div> */}
            </div>

            <div className=" flex gap-2">
              <div className=" flex items-center flex-col   w-10">
                <div className=" border-2 border-slate-500 p-[1px] rounded-full">
                  <div
                    className={ ` w-3 h-3 md:w-5 md:h-5 rounded-full ${
                      od?.status === "Confirmed" ||
                      od?.status === "Shipping" ||
                      od?.status === "Delivered"
                        ? "bg-black text-white"
                        : ""
                    } `}
                  ></div>
                </div>
                <span className=" h-10 w-[2px] bg-black"></span>
              </div>

              {/* <div className=" text-sm">Confirm</div> */}
            </div>

            <div className=" flex gap-2">
              <div className=" flex items-center flex-col  w-10">
                <div className=" border-2 border-slate-500 p-[1px] rounded-full">
                  <div
                    className={` w-3 h-3 md:w-5 md:h-5 rounded-full ${
                      od?.status === "Shipping" || od?.status === "Delivered"
                        ? "bg-black text-white"
                        : ""
                    } `}
                  ></div>
                </div>
                <span className=" h-10 w-[2px] bg-black"></span>
              </div>

              {/* <div className=" text-sm">Shipping</div> */}
            </div>
            <div className=" flex gap-2">
              <div className=" flex items-center flex-col  w-10">
                <div className=" border-2 border-slate-500 p-[1px] rounded-full">
                  <div
                    className={` w-3 h-3 md:w-5 md:h-5 rounded-full ${
                      od?.status === "Delivered" ? "bg-black text-white" : ""
                    } `}
                  ></div>
                </div>
              </div>

              {/* <div className=" text-sm">Delivered</div> */}
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className=" flex ">
              <div className=" flex items-center flex-col p-[1px] ">
                <div className=" text-sm  -mt-[2px] md:mt-[3px]">Pending</div>
                <span className=" h-10 w-[2px] bg-slate-100"></span>
              </div>
            </div>

            <div className=" flex gap-2">
              <div className=" flex items-center flex-col    ">
                <div className=" text-sm  -mt-1 md:mt-1">Confirmed</div>
                <span className=" h-10 w-[2px] bg-slate-100"></span>
              </div>
            </div>

            <div className=" flex gap-2">
              <div className=" flex items-center flex-col  ">
                <div className=" text-sm  -mt-1 md:mt-1">Shipping</div>
                <span className=" h-10 w-[2px] bg-slate-100"></span>
              </div>
            </div>
            <div className=" flex gap-2">
              <div className=" flex items-center flex-col  ">
                <div className=" text-sm -mt-[2px] md:mt-1">Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
