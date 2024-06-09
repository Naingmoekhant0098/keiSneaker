import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Breadcrumb,
  Button,
  Datepicker,
  Dropdown,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { Table } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { CiDiscount1, CiEdit, CiTrash } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { BsQuestionSquare } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import Model from "../components/Model";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import Discount from "../components/Discount";
import emailjs from "@emailjs/browser";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Line,
  CartesianGrid,
  Tooltip,
  YAxis,
  AreaChart,
  Area,
} from "recharts";
const Order = () => {
  const [showModel, setShowModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [orders, setOrders] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalProduct, setTotalProducts] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [disId, setDisId] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [status, setStatus] = useState("");
  const [orderData, setOrderData] = useState();
  const [chooseDate, setChooseDate] = useState("");
  const [orderSta, setOrderSta] = useState("");
  const [orderTraffic, setOrderTraffic] = useState(null);
  const [currentOrders, setCurrentOrders] = useState(0);
  const loadMoreHandler = async () => {
    try {
      setShowLoad(true);
      const res = await axios.get(
        `http://localhost:3000/order/getOrders?name=${searchTerm}&date=${chooseDate}&order=${order}&startIndex=${orders.length}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setOrders((prev) => [...prev, ...res.data.orders]);
        setShowLoad(false);
        if (res.data.orders.length > 6) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    const serchData = async () => {
      try {
        setShowLoad(true);
        const res = await axios.get(
          `http://localhost:3000/order/getOrders?name=${searchTerm}&date=${chooseDate}&status=${orderSta}&order=${order}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setOrders(res.data.orders);
          setShowLoad(false);
          setOrderTraffic(res.data.orderTraffic);
          setOrderData(res.data.oneYearData);
          setTotalProducts(res.data.totalProducts);
          setCurrentOrders(res.data.currentMonthProducts.length);
          if (res.data.orders.length < 6) {
            setLoadMore(false);
          } else {
            setLoadMore(true);
          }
        }
      } catch (error) {}
    };

    serchData();
  }, [searchTerm, order, chooseDate, orderSta]);

  const deleteUserHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/product/deleteProduct/${deleteItem}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setShoes(shoes.filter((shoe) => shoe._id !== deleteItem));
        setShowModel(false);
        toast.success("Product deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const hadleSubmit = async (id, status, name, email, products) => {
    try {
      const updateStatus = await axios.put(
        "http://localhost:3000/order/updateStatus",
        { id, status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
     

      if (updateStatus.status == 200) {
        setOrders(
          orders.map((rev) =>
            rev._id === id
              ? {
                  ...rev,
                  status: status,
                }
              : rev
          )
        );

        const serviceId = "service_k9o1uv6";
    const templateId = "template_8ubwbgk";
    const publicId = "X6YRhbzsQQO7nzaa9";

        if (status === "New") {
          toast.success("New order");
        } else if (status === "Pending") {
          toast.success("Pending order");
        } else if (status === "Delivered") {
          toast.success("Delivered");

          let table = "";
          let total = 0;
          products.map((pt) => {
            total += pt.price * pt.qty;
            table += `<tr>
            <td style="padding: 8px;">${pt._id}</td>
            <td style="padding: 8px;"><img src=${
              pt.photos[0]
            } style="width:100px;height:100px" alt="" /></td>
           
            <td style="padding: 8px;">${pt.qty} X ${pt.name}</td>
            <td style="padding: 8px;">$${pt.qty * pt.price}</td>
            
        </tr>`;
          });

          const templateParam = {
            from_email: "keikazuki0098@gmail.com",
            from_name: "Kei Sneaker Shop",
            to_name: name,
            email_to: email,
            message: table,
            total: total,
            title:
              "Congratulation Dear Customer, your order is successfully delivered from our shop 🥂🥳",
          };
          emailjs
            .send(serviceId, templateId, templateParam, {
              publicKey: publicId,
            })
            .then(
              () => {
                console.log("SUCCESS!");
              },
              (error) => {
                console.log(error);
              }
            );
        } else {
          const serviceId = "service_7qg447a";
          const templateId = "template_q4zk1rk";
          const publicId = "4bYWuJ7sxXoOYSUyj";
          toast.success("Canceled");
          const templateParam = {
            from_email: "keikazuki0098@gmail.com",
            from_name: "Kei Sneaker Shop",
            to_name: name,
            email_to: email,
            message:
              "Dear Customer,Your order is canceled for some factors , Thank You",
          };
          emailjs
            .send(serviceId, templateId, templateParam, {
              publicKey: publicId,
            })
            .then(
              () => {
                console.log("SUCCESS!");
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="py-2 md:p-4 md:-ml-8 mt-14 ">
      <div className=" mb-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=products"}>Orders</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div>
        <h1 className=" text-xl mb-6 font-semibold ">Orders </h1>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-100 rounded-md p-3 flex gap-1">
            <div className="flex-1 flex flex-col justify-between ">
              <div className=" text-[14px]  ">New Orders</div>
              <div className=" mt-1 font-semibold">{currentOrders}</div>
              <span className=" text-[12px] cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="flex-1 md:flex-2   flex-col justify-between items-center h-full">
              <div className="">
                <ResponsiveContainer minWidth={20} height={50}>
                  <AreaChart data={orderData}>
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        background: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="counts"
                      stroke="#FF2DFF"
                      fill="#FF2DFF"
                      dot={false}
                      strokeWidth={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-right mt-4">
                <span className=" text-[16px] font-semibold  text-green-500">
                  20%
                </span>
                <div className="text-[12px] opacity-85">This Week</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-md p-3 flex gap-1">
            <div className="flex-1 flex flex-col justify-between ">
              <div className=" text-[14px] ">Pending Orders</div>
              <div className=" mt-1 font-semibold">
                {orderTraffic?.[0]?.value}
              </div>
              <span className=" text-[12px] cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
              <div className="">
                <ResponsiveContainer minWidth={20} height={50}>
                  <AreaChart data={orderData}>
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        background: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="counts"
                      stroke="rgb(26, 232, 232)"
                      fill="rgb(26, 232, 232)"
                      dot={false}
                      strokeWidth={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-right mt-4">
                <span className=" text-[16px] font-semibold  text-red-500">
                  -20%
                </span>
                <div className="text-[12px] opacity-85">This Week</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-md p-3 flex gap-1">
            <div className="flex-1 flex flex-col justify-between ">
              <div className=" text-[14px] ">Delivered Orders</div>
              <div className=" mt-1 font-semibold">
                {orderTraffic?.[3]?.value}
              </div>
              <span className=" text-[12px] cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className=" flex-1 md:flex-2 felx flex-col justify-between items-center">
              <div className="">
                <ResponsiveContainer minWidth={20} height={50}>
                  <AreaChart data={orderData}>
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        background: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="counts"
                      stroke="rgb(227, 255, 68)"
                      fill="rgb(227, 255, 68)"
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-right mt-4">
                <span className=" text-[16px] font-semibold  text-yellow-400">
                  10%
                </span>
                <div className="text-[12px] opacity-85">This Week</div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 rounded-md p-3 flex gap-1">
            <div className="flex-1 flex flex-col justify-between ">
              <div className=" text-[14px] ">Confirmed Orders</div>
              <div className=" mt-1 font-semibold">
                {orderTraffic?.[1]?.value}
              </div>
              <span className=" text-[12px] cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
              <div className="">
                <ResponsiveContainer minWidth={20} height={50}>
                  <AreaChart data={orderData}>
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        background: "transparent",
                        color: "black",
                        border: "none",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="counts"
                      stroke="rgb(57, 57, 255)"
                      fill="rgb(57, 57, 255)"
                      strokeWidth={0.3}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-right mt-4">
                <span className=" text-[16px] font-semibold  text-green-500">
                  20%
                </span>
                <div className="text-[12px] opacity-85">This Week</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className=" text-[18px] font-semibold mb-4">Order Overview</div>

          <div className=" bg-red-50 w-full overflow-x-auto h-auto py-5 flex rounded-lg">
            <ResponsiveContainer minWidth={400} height={400} className="">
              <AreaChart
                data={orderData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeOpacity={0.3} />
                <XAxis dataKey="month" style={{ fontSize: "14px" }} />
                <Tooltip
                  contentStyle={{
                    fontSize: "12px",
                    background: "transparent",
                    border: "none",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="counts"
                  stroke="#FF2DFF"
                  fill="#FF2DFF"
                  dot={false}
                />

                <YAxis dataKey="counts" style={{ fontSize: "14px" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div></div>
      </div>

      <div className=" flex items-center  my-5">
        <div className="w-full flex items-center justify-between gap-3">
          <div className=" flex items-center gap-2 text-sm">
            <Select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value={"asc"}>
                <span className=" text-[12px]">Earlist</span>
              </option>
              <option value={"desc"}>
                <span className=" text-[16px]">Latest</span>
              </option>
            </Select>

            <Select
              value={orderSta}
              onChange={(e) => setOrderSta(e.target.value)}
            >
              <option value={""}>
                <span className=" text-[12px]">All</span>
              </option>

              <option value={"Pending"}>
                <span className=" text-[16px]">Pending</span>
              </option>
              <option value={"Confirmed"}>
                <span className=" text-[16px]">Confirmed</span>
              </option>
              <option value={"Shipping"}>
                <span className=" text-[16px]">Shipping</span>
              </option>
              <option value={"Delivered"}>
                <span className=" text-[16px]">Delivered</span>
              </option>
              <option value={"Canceled"}>
                <span className=" text-[16px]">Canceled</span>
              </option>
            </Select>

            <Datepicker onSelectedDateChanged={(e) => setChooseDate(e)} />
          </div>
          <TextInput
            placeholder="Search... "
            value={searchTerm}
            className=" text-sm  w-32 md:w-auto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto  ">
        <Table className=" text-center relative">
          <Table.Head className=" text-md">
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Items</Table.HeadCell>
            <Table.HeadCell>price</Table.HeadCell>

            <Table.HeadCell>Payment</Table.HeadCell>

            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y ">
            {order?.length > 0 ? (
              orders?.map((orderr, index) => {
                return (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      #{orderr._id}
                    </Table.Cell>
                    <Table.Cell>
                      {orderr?.firstName} {orderr?.lastName}
                    </Table.Cell>
                    <Table.Cell>
                      <div className=" flex flex-col gap-2 text-[12px]">
                        {orderr.products?.map((pt, index) => {
                          return (
                            <span>
                              {pt.qty} X {pt.name}
                            </span>
                          );
                        })}
                      </div>
                    </Table.Cell>
                    <Table.Cell>${orderr.total}</Table.Cell>
                    <Table.Cell>
                      <div className=" text-green-500">Paid</div>
                    </Table.Cell>
                    <Table.Cell>
                      {moment(orderr?.createdAt).format("LL")}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="  flex  items-center justify-center">
                        <Dropdown
                          label=<div
                            className={`border p-2 px-4  rounded   ${
                              orderr?.status === "Pending"
                                ? "text-blue-400 border-blue-400"
                                : orderr?.status === "Confirmed"
                                ? "text-yellow-400 border-yellow-400"
                                : orderr?.status === "Shipping"
                                ? "text-green-800 border-green-600"
                                : orderr?.status === "Delivered"
                                ? " text-cyan-600 border-cyan-600"
                                : "text-red-400 border-red-400"
                            }`}
                          >
                            {orderr?.status}
                          </div>
                          inline
                          arrowIcon={false}
                        >
                          <Dropdown.Item
                            className="text-sm text-yellow-300"
                            onClick={() => {
                              hadleSubmit(
                                orderr?._id,
                                "Pending",
                                orderr?.firstName + orderr?.lastName,
                                orderr?.email,
                                orderr?.products
                              );

                              setStatus("Pending");
                            }}
                          >
                            Pending
                          </Dropdown.Item>

                          <Dropdown.Item
                            className=" text-sm  text-cyan-500"
                            onClick={() => {
                              hadleSubmit(
                                orderr?._id,
                                "Confirmed",

                                orderr.firstName + orderr.lastName,
                                orderr?.products
                              );
                              setStatus("Confirmed");
                            }}
                          >
                            Confirmed
                          </Dropdown.Item>
                          <Dropdown.Item
                            className=" text-sm  text-cyan-500"
                            onClick={() => {
                              hadleSubmit(
                                orderr?._id,
                                "Shipping",

                                orderr.firstName + orderr.lastName,
                                orderr?.products
                              );
                              setStatus("Shipping");
                            }}
                          >
                            Shipping
                          </Dropdown.Item>

                          <Dropdown.Item
                            className="text-sm text-green-600"
                            onClick={() => {
                              hadleSubmit(
                                orderr?._id,
                                "Delivered",
                                orderr?.firstName + orderr?.lastName,
                                orderr?.email,
                                orderr?.products
                              );

                              setStatus("Delivered");
                            }}
                          >
                            Delivered
                          </Dropdown.Item>

                          <Dropdown.Item
                            className="text-sm text-red-400"
                            onClick={() => {
                              hadleSubmit(
                                orderr?._id,
                                "Canceled",
                                orderr?.firstName + orderr?.lastName,
                                orderr?.email,
                                orderr?.products
                              );

                              setStatus("Canceled");
                            }}
                          >
                            Canceled
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div
                        className=" flex items-center gap-1 cursor-pointer text-red-400"
                        onClick={() => {
                          setShowModel(true), setDeleteItem(orderr?._id);
                        }}
                      >
                        <CiTrash className=" text-lg " />
                        <span>Delete</span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <h3 className=" my-4">No Order Yet !</h3>
            )}
          </Table.Body>
        </Table>
        {loadMore && (
          <div
            className=" text-center cursor-pointer text-sm mt-2"
            onClick={loadMoreHandler}
          >
            {showLoad ? (
              <span>
                <span>Loading....</span>
              </span>
            ) : (
              <span>Load More</span>
            )}
          </div>
        )}
      </div>
      {/* modal */}
      <Model
        deleteUserHandler={deleteUserHandler}
        showModel={showModel}
        setShowModel={setShowModel}
      />
    </div>
  );
};

export default Order;
