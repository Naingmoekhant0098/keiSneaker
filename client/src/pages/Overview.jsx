import { Breadcrumb, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
  PieChart,
  Pie,
  Legend,
  Cell,
  Label,
  LabelList,
} from "recharts";
import axios from "axios";
import { FaChartLine, FaChartPie, FaFileCirclePlus } from "react-icons/fa6";
import { FiFilePlus, FiMoreVertical, FiShoppingBag } from "react-icons/fi";
import moment from "moment";
import { CiTrash } from "react-icons/ci";
import { HiInboxStack, HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const Overview = () => {
  const [orderData, setOrderData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [oneYearOrder, setOrderOneYear] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [lastYearOrder, setLastYearOrder] = useState(null);
  const [currentYearOrdersTotal, setCurrentYearOrderData] = useState(0);
  const [customers, setCustomers] = useState(null);
  const [todaySale , setTodaySale] = useState(0);
  const [totalSale,setTotalSale]=useState(null)
  const [totalUsers,setTotalUsers]= useState(0)
 const [orderTraffic,setOrderTraffic] = useState(null);
  let totalSaleData=0;
  useEffect(() => {
    const serchData = async () => {
      try {
        const res = await axios.get(`https://keisneaker-8da6.onrender.com/order/getOrders?order='desc'`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
 
        
        if (res.status === 200) {
          setOrders(res.data.orders);
          setTodaySale(res.data.todaySale)
          setOrderOneYear(res.data.oneYearData);
          setTotalOrders(res.data.totalProducts);
          setLastYearOrder(res.data.lastYearTotalOrders);
          setCurrentYearOrderData(res.data.currentYearTotalOrders);
          setTotalSale( res.data.totalSaleData)
          setOrderTraffic(res.data.orderTraffic)
        
        }
      } catch (error) {}
    };

    serchData();
  }, []);

  totalSale?.map((res)=>totalSaleData+=res.total)
  useEffect(() => {
    const serchData = async () => {
      try {
        const res = await axios.get(
          `https://keisneaker-8da6.onrender.com/user/getUsers?order='desc'`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
 
        if (res.status === 200) {
          setCustomers(res.data.users);
          setTotalUsers(res.data.totalUsers)
        }
      } catch (error) {}
    };

    serchData();
  }, []);
  

   
  return (
    <div className=" p-2 md:p-4 md:-ml-8 mt-14">
      <div className=" mb-5">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px]  ">Total Orders</div>
            <div className=" mt-1 font-semibold">{totalOrders}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2   flex-col justify-between items-center h-full">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYearOrder}>
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
                {((currentYearOrdersTotal - lastYearOrder) / totalOrders) * 100}
                %
              </span>
              <div className="text-[12px] opacity-85">Last Year</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded-md p-3 flex gap-1">
          <div className="flex-1 flex flex-col justify-between ">
            <div className=" text-[14px] ">Today's Sale</div>
            <div className=" mt-1 font-semibold">${todaySale}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYearOrder}>
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
            <div className=" text-[14px] ">Total Sale</div>
            <div className=" mt-1 font-semibold">${totalSaleData && totalSaleData}</div>
            <span className=" text-[12px] cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className=" flex-1 md:flex-2 felx flex-col justify-between items-center">
            <div className="">
              <ResponsiveContainer minWidth={20} height={50}>
                <AreaChart data={oneYearOrder}>
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
                <AreaChart data={oneYearOrder}>
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

      <div className=" flex flex-col md:flex-row w-full gap-6">
        <div>
          <div>
            <div className=" bg-slate-100 shadow w-full md:w-[800px] overflow-x-auto h-auto py-4 flex rounded-lg flex-col">
              <div className=" flex justify-between items-center px-4 mb-4">
                <div className=" text-[16px] font-semibold flex items-center gap-2  ">
                 <FaChartLine className=" text-xl"/> Order Overview
                </div>
                <div className=" text-sm border px-2 py-1 flex items-center gap-1 border-black rounded cursor-pointer">
                  <FiFilePlus />
                  Export PDF
                </div>
              </div>
              <ResponsiveContainer minWidth={200} height={400} className="">
                <LineChart
                  data={oneYearOrder}
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

                  <Line
                    type="monotone"
                    dataKey="counts"
                    stroke="#FF2DFF"
                    fill="#FF2DFF"
                    dot={false}
                    id="line1"
                  />
                   <Line
                    type="monotone"
                    dataKey="lastCounts"
                    stroke="#FF2DFF"
                    fill="#FF2DFF"
                    dot={false}
                    id="line2"
                  />

                  <YAxis dataKey="counts" style={{ fontSize: "14px" }} id="yaxios"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className=" bg-slate-100 w-full md:w-[400px] p-4 shadow rounded-lg">
          <div className=" flex justify-between items-center px-0 mb-4">
            <div className=" text-[16px] font-semibold  flex
             items-center gap-2">
              <FaChartPie  className=" text-xl"/>
              Order Traffic</div>

            <div>
              <FiMoreVertical />
            </div>
          </div>
          <ResponsiveContainer minWidth={100} height={300} className="">
            <PieChart style={{ cursor: "pointer" }}>
              <Pie
                dataKey="value"
                data={orderTraffic}
                // label={name}
                cx="50%"
                cy="50%"
                outerRadius={"75%"}
                nameKey="name"
                activeShape={(props) => renderActiveShape(props, showSubchart)}
                // onMouseEnter={onMouseOver}
                // onMouseLeave={onMouseLeave}
              >
                <LabelList
                  dy={-3}
                  fill="white" // Percentage color
                  // dataKey="percentage"
                
                  position="inside"
                  angle="0"
                  stroke="none" // Border of letters
                  className="label-percentage"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div>
            {orderTraffic?.map((dt) => {
              return (
                <div className=" flex justify-between">
                  <div className=" flex items-center gap-2">
                    <div
                      className={` w-2 h-2 rounded-full ${dt?.name === 'Pending Orders' ? `bg-[#3333FF]` : dt?.name==='Confirmed Orders' ? 'bg-[#FF9933]' : dt?.name==='Shipped Orders' ? 'bg-[#FF3333]' :'bg-[#00FF00]'}`}
                    ></div>
                    <div className=" text-sm">{dt.name}</div>
                  </div>
                  <div className=" text-sm">{dt.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className=" flex flex-col md:flex-row w-full gap-6 ">
        <div className=" w-full md:w-[800px]  bg-slate-100 shadow rounded-lg mt-6">
          <div className=" px-3 py-3">
            <div className=" flex justify-between items-center">
              <div className=" flex items-center gap-2">
                <FiShoppingBag className=" text-xl" />
                <div className=" text-base font-medium">Recent Orders</div>
              </div>

              <div>
                <FiMoreVertical />
              </div>
            </div>
          </div>
          <div className=" overflow-x-auto">

          <Table className=" text-center relative">
            <Table.Head className=" text-md">
              <Table.HeadCell>Customer</Table.HeadCell>
              <Table.HeadCell>Items</Table.HeadCell>
              <Table.HeadCell>price</Table.HeadCell>

              <Table.HeadCell>Payment</Table.HeadCell>

              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y ">
              {orders?.length > 0 ? (
                orders?.map((orderr, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
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
                          {orderr?.status}
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
          </div>
        </div>

        <div className=" md:w-[400px] h-[100%]  bg-slate-100 shadow rounded-lg mt-6">
          <div className=" px-3 py-3">
            <div className=" flex justify-between items-center">
              <div className=" flex items-center gap-2">
                <HiOutlineUsers className=" text-xl"/>
                <div className=" text-base font-medium">Recent Customers</div>
              </div>

              <div>
                <FiMoreVertical />
              </div>
            </div>
          </div>

         <div className=" flex flex-col gap-3 px-3  mt-2">
         {customers?.length > 0 ? (
            customers?.map((user, index) => {
              return (
                <>
                <div className=" flex  gap-2">
                  <div>
                    <img
                      src={user?.profile}
                      className=" w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                  </div>
                 <div className=" flex items-center justify-between flex-1 ">
                 <div className=" ">
                    <div className=" text-[14px] font-medium">{user?.username}</div>

                    <div className=" flex gap-2">
                      <div className=" text-[12px] opacity-85">{user?.email}</div>
                      <div className=" text-[12px]"> Joined on {moment(user?.createdAt).format('ll')}</div>
                    </div>
                  </div>
                  <div>
                <FiMoreVertical />
              </div>
                 </div>
                </div>
                <hr />
                </>
              );
            })
          ) : (
            <h3 className=" my-4">No Order Yet !</h3>
          )}
         </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
