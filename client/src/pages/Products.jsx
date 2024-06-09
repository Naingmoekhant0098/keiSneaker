import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Breadcrumb,
  Button,
  Datepicker,
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

const Products = () => {
  const [showModel, setShowModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [shoes, setShoes] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalProduct, setTotalProducts] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [disId, setDisId] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const [oneYear, setOneYear] = useState();
  const [orderSta, setOrderSta] = useState("");
  const [chooseDate, setChooseDate] = useState("");
  const [lastMonthProduct,setLastMonthProducts] = useState(0);
  const [newProducts,setNewProducts] = useState(null);
  const [revenue,setRevenue] = useState(0)
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/user/getUsers", {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       });
  //       if (res.status === 200) {
  //         setUsers(res.data.users);
  //         if (res.data.users.length >= 6) {
  //           setLoadMore(true);
  //         } else {
  //           setLoadMore(false);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const loadMoreHandler = async () => {
    try {
      setShowLoad(true);
      const res = await axios.get(
        `https://keisneaker-8da6.onrender.com/product/getProducts?name=${searchTerm}&status=${orderSta}&date=${chooseDate}&order=${order}&startIndex=${shoes.length}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setShoes((prev) => [...prev, ...res.data.shoes]);
        setShowLoad(false);
        if (res.data.shoes.length < 6) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    const serchData = async () => {
      try {
        setShowLoad(true);
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/product/getProducts?name=${searchTerm}&date=${chooseDate}&status=${orderSta}&order=${order}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
   
        if (res.status === 200) {
          setShoes(res.data.shoes);
          setLastMonthProducts(res.data.lastMonthProducts
          )
          setRevenue(res.data.todaySale)
          setNewProducts(res.data.currentMonthProducts)
          setShowLoad(false);
          setTotalProducts(res.data.totalProducts);
          setOneYear(res.data.oneYearData);
          if (res.data.shoes.length < 6) {
            setLoadMore(false);
          } else {
            setLoadMore(true);
          }
        }
      } catch (error) {}
    };

    serchData();
  }, [searchTerm, order, orderSta, chooseDate]);

  const deleteUserHandler = async () => {
    try {
      const res = await axios.delete(
        `https://keisneaker-8da6.onrender.com/product/deleteProduct/${deleteItem}`,
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

  const discountSubmit = async (discount, discountPrice) => {
    if (!discount || !discountPrice) {
      toast.error("Please fill required fields");
    }
    try {
      const res = await axios.put(
        `https://keisneaker-8da6.onrender.com/product/addDiscount`,
        { id: disId, discount: discount, discountPrice: discountPrice },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setShoes(
          shoes.map((shoe) =>
            shoe._id === disId
              ? {
                  ...shoe,
                  isOnSale: true,
                  onSalePercentage: discount,
                  onSalePrice: discountPrice,
                }
              : shoe
          )
        );
        setShowDiscount(false);
      }
    } catch (error) {}
  };
  const handleStock = async (id, status) => {
    try {
      const res = await axios.get(
        `https://keisneaker-8da6.onrender.com/product/stockProduct/${id}?status=${status}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setShoes(
          shoes.map((shoe) =>
            shoe._id === id
              ? {
                  ...shoe,
                  status: status,
                }
              : shoe
          )
        );

        if (status) {
          toast("In Stock!", {
            icon: "👏",
          });
        } else {
          toast("Out Stock!", {
            icon: "😭",
          });
        }
      }
    } catch (error) {}
  };
  return (
    <div className="py-2 md:p-4 md:-ml-8 mt-14 ">
      <div className=" mb-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=products"}>Products</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" w-full flex  justify-between items-center mb-6">
        <h1 className=" text-xl font-semibold  ">Products </h1>
        <Link to={"/dashboard?tab=addProduct"} className=" text-sm">
          <div className=" text-[13px] md:text-xl flex items-center gap-2 p-2 md:py-3 px-2 md:px-4 text-center bg-black rounded-lg cursor-pointer border text-white transition duration-500 hover:bg-white uppercase  hover:border-black hover:text-black">
            <CiCirclePlus className=" text-xl    font-semibold " /> Add Product
          </div>
        </Link>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px] ">Today Products</div>
            <div className=" mt-1 font-semibold">{newProducts?.length}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYear}>
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
              <span className=" text-[16px] font-semibold  text-cyan-500">
                20%
              </span>
              <div className="text-[12px] opacity-85">This Week</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px] ">Total Products</div>
            <div className=" mt-1 font-semibold">{totalProduct}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYear}>
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
            <div className=" text-[14px] ">LastMonth Products</div>
            <div className=" mt-1 font-semibold">{lastMonthProduct?.length}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className=" flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYear}>
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
            <div className=" text-[14px] ">Total Revenue</div>
            <div className=" mt-1 font-semibold">${revenue}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYear}>
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
      <div className=" bg-red-50 w-full overflow-x-auto h-auto py-5 flex">
        <ResponsiveContainer minWidth={400} height={400} className="">
          <AreaChart
            data={oneYear}
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

      <div className=" flex items-center justify-between mb-5 mt-6">
        <div className=" flex items-center gap-3">
          <div className=" flex items-center gap-2 text-sm">
            <Select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value={"asc"}>
                <span className=" text-[12px]">Earlist</span>
              </option>
              <option value={"desc"}>
                <span className=" text-[16px]">Latest</span>
              </option>
            </Select>
          </div>
          <Select
            value={orderSta}
            onChange={(e) => setOrderSta(e.target.value)}
          >
            <option value={""}>
              <span className=" text-[12px]">All</span>
            </option>
            <option value={"true"}>
              <span className=" text-[16px]">In Stock</span>
            </option>
            <option value={"false"}>
              <span className=" text-[16px]">Out Stock</span>
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
      <div className="overflow-x-auto  ">
        <Table className=" text-center relative">
          <Table.Head className=" text-md">
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>name</Table.HeadCell>
            <Table.HeadCell>price</Table.HeadCell>
            <Table.HeadCell>brand</Table.HeadCell>
            <Table.HeadCell>category</Table.HeadCell>
            <Table.HeadCell>color</Table.HeadCell>

            <Table.HeadCell>Created Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y ">
            {shoes?.map((shoe, index) => {
              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/shop/${shoe?.slug}`}>
                      <img
                        src={shoe?.photos[0]}
                        alt=""
                        className=" w-16 h-14 rounded-lg object-cover cursor-pointer"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{shoe?.name}</Table.Cell>
                  <Table.Cell className=" ">
                    <div
                      className={`${
                        shoe?.isOnSale && "line-through text-[12px]"
                      }`}
                    >
                      $ {shoe?.price}
                    </div>
                    {shoe?.onSalePrice && <div>${shoe?.onSalePrice}</div>}
                  </Table.Cell>
                  <Table.Cell>{shoe?.brand}</Table.Cell>
                  <Table.Cell>{shoe?.category}</Table.Cell>
                  <Table.Cell className=" cursor-pointer">
                    {shoe?.colors.map((color, index) => {
                      return (
                        <span key={index}>
                          {color}
                          {index === shoe.colors.length - 1 ? " " : " , "}
                        </span>
                      );
                    })}
                  </Table.Cell>

                  <Table.Cell>
                    {moment(shoe?.createdAt).format("LL")}
                  </Table.Cell>
                  <Table.Cell>
                    {shoe?.status ? (
                      <div
                        className="border border-slate-500 p-2 text-[12px] cursor-pointer text-slate-500 rounded-md transition duration-500  hover:bg-slate-500 hover:text-white"
                        onClick={() => handleStock(shoe?._id, false)}
                      >
                        In Stock
                      </div>
                    ) : (
                      <div
                        className="border cursor-pointer border-red-500 p-2 text-[12px] text-red-500 rounded-md transition duration-500  hover:bg-red-500 hover:text-white"
                        onClick={() => handleStock(shoe?._id, true)}
                      >
                        Out Stock
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/dashboard?tab=editProduct&slug=${shoe?.slug}`}
                      >
                        <div className="border border-slate-500 p-2 flex items-center gap-1 text-[12px]   cursor-pointer text-slate-500 rounded-md transition duration-500  hover:bg-slate-500 hover:text-white">
                          <CiEdit className=" text-lg " />
                        </div>
                      </Link>
                      <div
                        className="border cursor-pointer border-red-500 p-2 gap-1 flex items-center text-[12px] text-red-500 rounded-md transition duration-500  hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          setShowModel(true);
                        }}
                      >
                        <CiTrash
                          className=" text-lg "
                          onClick={() => setDeleteItem(shoe?._id)}
                        />
                      </div>
                      <div className="border cursor-pointer border-blue-500 p-2 gap-1 flex items-center text-[12px] text-blue-500 rounded-md transition duration-500  hover:bg-blue-500 hover:text-white">
                        <CiDiscount1
                          className=" text-lg "
                          onClick={() => {
                            setShowDiscount(true),
                              setCurrentPrice(shoe?.price),
                              setDisId(shoe?._id);
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className=" flex items-center gap-2 cursor-pointer text-red-400" onClick={()=>{
                    
                      setDeleteItem(user?._id);
                    }}>
                     
                    </div> */}
                  </Table.Cell>
                </Table.Row>
              );
            })}
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
      <Discount
        currentPrice={currentPrice}
        discountSubmit={discountSubmit}
        showDiscount={showDiscount}
        setShowDiscount={setShowDiscount}
      />
    </div>
  );
};

export default Products;
