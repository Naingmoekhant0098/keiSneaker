import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const OrderDetail = () => {
  const { orderId } = useParams();

  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ress = await axios.get(
          `https://keisneaker-8da6.onrender.com/order/getOrders?orderId=${orderId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (ress.status === 200) {
          setOrder(ress.data.orders[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [orderId]);

  return (
    <div className=" px-4 md:px-0 mt-28 w-full md:max-w-5xl mx-auto  flex flex-col">
      <div className=" font-semibold text-xl">
        Order Details<span className=" text-[14px]"> # {orderId}</span>{" "}
        <span className=" text-[10px] uppercase bg-green-400 px-2 py-1 rounded text-white">
          {order?.status}
        </span>
      </div>
      <div className=" text-sm mt-2 opacity-75">Date : 08/02/2023</div>
      <div className=" mt-3">
        <div className="  items-center   mx-auto flex justify-between">
          <span
            className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
              order?.status === "Pending" ||  order?.status === "Confirmed" ||  order?.status === "Shipping"|| order?.status === "Delivered" ? "bg-black text-white" : ""
            }`}
          >
            1
          </span>
          <span
            className={` h-[2px] flex-1 bg-gray-500 ${step >= 1 && "bg-black"}`}
          ></span>
          <span
            className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
              order?.status === "Confirmed" ||  order?.status === "Shipping" || order?.status === "Delivered"
                ? "bg-black text-white"
                : ""
            }`}
          >
            2
          </span>
          <span
            className={` h-[2px] flex-1 bg-gray-500 ${step >= 1 && "bg-black"}`}
          ></span>
          <span
            className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
              order?.status === "Shipping"|| order?.status === "Delivered" ? "bg-black text-white" : ""
            }`}
          >
            3
          </span>
          <span
            className={` h-[2px] flex-1 bg-gray-500 ${step >= 1 && "bg-black"}`}
          ></span>
          <span
            className={` cursor-pointer p-2  border border-black text-black  w-10 text-center rounded-full ${
              order?.status === "Delivered" ? "bg-black text-white" : ""
            }`}
          >
            4
          </span>
        </div>
      </div>
      <div className=" mt-1 items-center   flex justify-between">
        <span className="  font-semibold">Pending</span>
        <span className="  font-semibold">Order Confirmed</span>
        <span className="  font-semibold">Shipping</span>
        <span className="  font-semibold">Delivered</span>
      </div>
      <div className=" flex justify-between flex-col md:flex-row w-full     mt-10 gap-6">
        <div className="w-full  ">
          <div className=" text-xl font-semibold pb-2 uppercase">Ordered Items</div>
<hr />
          {order &&
            order?.products?.map((pt) => {
              return (
                <div className=" flex mt-6 gap-6 ">
                    <Link to={`/shop/${pt?.slug}`}>
                  <img
                    src={pt?.photos[0]}
                    alt=""
                    className=" w-36 h-36 md:w-42 md:h-42 object-cover rounded-md"
                  /></Link>
                  <div>
                    <div className=" uppercase font-semibold text-sm md:text-[16px] opacity-50">
                      {pt?.brand}
                    </div>
                    <div className=" font-medium mb-1">{pt?.name}</div>
                    <div className=" flex   flex-col">
                      <div className="text-[14px] opacity-75">
                        {pt?.category}
                      </div>
                      <div className="text-[14px] opacity-75">
                        <span>Size :</span>
                        {pt?.size} ,<span> Color :</span> {pt?.color}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div>
        <div className=" text-xl font-semibold pb-2">INVOICE</div>
        <hr />
        <div className=" flex flex-col w-full md:flex-row gap-4 mt-6">
          
          
          <div className=" border p-3 rounded-md  bg-slate-100">
            <div className=" flex flex-col gap-2">
              <div className=" font-medium">Customer & Order</div>
              <div className=" text-sm mt-1">
                <span className="  font-medium mr-1">Name : </span>
                <span className=" opacity-80">
                  {order?.firstName} {order?.lastName}
                </span>
              </div>
              <div className=" text-sm ">
                <span className="  font-medium mr-1">Address : </span>
                <span className=" opacity-80">
                  {order?.address1} {order?.city},{order?.zip}
                  {order?.state}
                </span>
              </div>

              <div className=" text-sm  ">
                <span className="  font-medium mr-1">Phone : </span>
                <span className=" opacity-80">{order?.phone}</span>
              </div>

              <div className=" text-sm  ">
                <span className="  font-medium mr-1">Email : </span>
                <span className=" opacity-80">{order?.email}</span>
              </div>
            </div>
          </div>
          <div className=" border p-3 rounded-md bg-slate-100">
            <div className=" flex flex-col gap-2">
              <div className=" font-medium">Payment Infos</div>
              <div className=" text-sm mt-3">
                <span className="  font-medium mr-1">Order ID : </span>
                <span className=" opacity-80">#{orderId}</span>
              </div>
              <div className=" text-sm ">
                <span className="  font-medium mr-1">Time Ordered : </span>
                <span className=" opacity-80">
                  {moment(order?.createdAt).format("ll")}
                </span>
              </div>

              <div className=" text-sm  ">
                <span className="  font-medium mr-1">Payment Method : </span>
                <span className=" opacity-80">Card</span>
              </div>
              <div className=" text-sm pb-2 ">
                <span className="  font-medium mr-1">Payment Status : </span>
                <span className=" opacity-80">Approved</span>
              </div>
              <hr />

              <div className=" text-sm  ">
                <span className="  font-medium mr-1">Shipping Cost : </span>
                <span className=" opacity-80">0$</span>
              </div>
              <div className=" text-sm  ">
                <span className="  font-medium mr-1">Total Without Tax : </span>
                <span className=" opacity-80">{order?.total}$</span>
              </div>
              <div className=" text-sm  pb-2">
                <span className="  font-medium mr-1"> Tax : </span>
                <span className=" opacity-80">30$</span>
              </div>
              <hr />
              <div className=" text-sm  pb-2">
                <span className="  font-medium mr-1"> Total Paid </span>
                <span className=" opacity-80">{order?.total + 30} $</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
