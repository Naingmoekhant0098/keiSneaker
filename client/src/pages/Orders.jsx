import { Table } from "flowbite-react";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const { orders } = useSelector((state) => state.user);

  return (
    <div className="mt-28 w-full px-4 md:px-0 md:max-w-5xl mx-auto  flex flex-col">
      <h1 className=" mb-4 text-xl font-semibold">Order History</h1>
      <div className=" mb-3">
        View the order history and check the delivery status for items
      </div>
      <div className="">
        {orders &&
          orders.map((od, index) => {
            return <OrderTable data={od} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Orders;
