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
import { CiTrash } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { BsQuestionSquare } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import Model from "../components/Model";
import toast from "react-hot-toast";

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
const Users = () => {
  const [showModel, setShowModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const { currentUser } = useSelector((state) => state.user);
  const [lastMonth, setLastMonth] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentUsers, setCurrentUsers] = useState(0);
  const [oneYear, setOneYear] = useState("");
  const [chooseDate, setChooseDate] = useState("");
  const loadMoreHandler = async () => {
    try {
      setShowLoad(true);
      const res = await axios.get(
        `http://localhost:3000/user/getUsers?username=${searchTerm}&date=${chooseDate}&order=${order}&startIndex=${users.length}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users]);
        setShowLoad(false);

        if (res.data.users.length >= 6) {
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
          `http://localhost:3000/user/getUsers?username=${searchTerm}&date=${chooseDate}&order=${order}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
 

        if (res.status === 200) {
          setUsers(res.data.users);
          setShowLoad(false);
          setTotalUsers(res.data.totalUsers);
          setLastMonth(res.data.lastMonthUsers.length);
          setCurrentUsers(res.data.currentMonthUser.length);
          setCurrentMonth(res.data.todayUsers.length);
          setOneYear(res.data.oneYearData);
          if (res.data.users.length >= 6) {
            setLoadMore(true);
          } else {
            setLoadMore(false);
          }
        }
      } catch (error) {}
    };

    serchData();
  }, [searchTerm, order, chooseDate]);

  const deleteUserHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/user/deleteUser/${deleteItem}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== deleteItem));
        setShowModel(false);
        toast.success("User deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="py-2 md:p-4 md:-ml-8 mt-14 ">
      <div className=" mb-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item>
            <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to={"/dashboard?tab=users"}>Customers</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h1 className=" text-xl mb-6 font-semibold ">Customers </h1>
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px]  ">New Customers</div>
            <div className=" mt-1 font-semibold">{currentMonth}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2   flex-col justify-between items-center h-full">
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
              <span className=" text-[16px] font-semibold  text-green-500">
                20%
              </span>
              <div className="text-[12px] opacity-85">This Week</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px] ">CurrentMonth Customers</div>
            <div className=" mt-1 font-semibold">{currentUsers}</div>
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
            <div className=" text-[14px] ">LastMonth Customers</div>
            <div className=" mt-1 font-semibold">{lastMonth}</div>
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
            <div className=" text-[14px] ">Total Customers</div>
            <div className=" mt-1 font-semibold">{totalUsers}</div>
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
      <div>
        <div className=" text-[16px] font-semibold mb-6">Order Overview</div>

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
      </div>

      <div className=" flex items-center justify-between mb-5 mt-6">
        <div className=" flex items-center gap-3 justify-between">
          <Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value={"asc"}>
              <span className=" text-[12px]">Earlist</span>
            </option>
            <option value={"desc"}>
              <span className=" text-[16px]">Latest</span>
            </option>
          </Select>
          <Datepicker onSelectedDateChanged={(e) => setChooseDate(e)} />
        </div>

        <TextInput
          placeholder="Search... "
          value={searchTerm}
          className="w-32 md:w-auto text-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto  ">
        <Table className=" text-center relative">
          <Table.Head className=" text-md">
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Profile</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Is Admin</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y ">
            {users?.map((user, index) => {
              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user?.profile}
                      alt=""
                      className=" w-14 h-14 rounded-lg object-cover cursor-pointer"
                    />
                  </Table.Cell>
                  <Table.Cell>{user?.username}</Table.Cell>
                  <Table.Cell>{user?.email}</Table.Cell>
                  <Table.Cell className=" cursor-pointer">
                    {user?.isAdmin ? (
                      <IoMdCheckmark className="text-green-400 text-lg" />
                    ) : (
                      <RxCross2 className="text-red-400 text-lg" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(user?.createdAt).format("LL")}
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className=" flex items-center gap-1 cursor-pointer text-red-400"
                      onClick={() => {
                        setShowModel(true), setDeleteItem(user?._id);
                      }}
                    >
                      <CiTrash className=" text-lg " />
                      <span>Delete</span>
                    </div>
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
    </div>
  );
};

export default Users;
