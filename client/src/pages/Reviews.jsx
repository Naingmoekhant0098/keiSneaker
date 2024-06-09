import React, { useEffect, useState } from "react";
import moment from "moment";
import { Breadcrumb, Button, Select, Spinner, TextInput } from "flowbite-react";
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
import TableRev from "../components/TableRev";
import emailjs from "@emailjs/browser";
const Reviews = () => {
  const [showModel, setShowModel] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDiscount, setShowDiscount] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [loadMore, setLoadMore] = useState(true);
  const [showLoad, setShowLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [totalProduct, setTotalProducts] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [disId, setDisId] = useState();

  const { currentUser } = useSelector((state) => state.user);
   

  const loadMoreHandler = async () => {
    try {
      setShowLoad(true);
      const res = await axios.get(
        `http://localhost:3000/product/getReview?comment=${searchTerm}&order=${order}&startIndex=${reviews.length}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setReviews((prev) => [...prev, ...res.data.reviews]);
        setShowLoad(false);
        if (res.data.reviews.length < 6) {
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
          `http://localhost:3000/product/getReview?comment=${searchTerm}&order=${order}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
       

        if (res.status === 200) {
          setReviews(res.data.reviews);
          // setShoes(res.data.shoes);
          setShowLoad(false);
          setTotalProducts(res.data.totalProducts);
          if (res.data.reviews.length < 6) {
            setLoadMore(false);
          } else {
            setLoadMore(true);
           
          }
        }
      } catch (error) {}
    };

    serchData();
  }, [searchTerm, order]);

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

  const hadleSubmit = async(id, status, name, email) => {
     
    try {
      const updateStatus = await axios.put('http://localhost:3000/product/updateStatus',{id,status},{
        headers : {'Content-Type' : 'application/json'},
        withCredentials : true
      })
       if(updateStatus.status==200){
        setReviews(reviews.map((rev)=>rev._id === id ? {
          ...rev,
          isSubmit : status
        } : rev))
       if(status === 'submited'){
        toast.success('Submmited');
       
       }else{
        toast.success('Banned')
       }
       }
    } catch (error) {
      console.log(error.message)
      
    }
    const serviceId = "service_k9o1uv6";
    const templateId = "template_f3wqf3h";
    const publicId = "X6YRhbzsQQO7nzaa9";

    if (status === "submited") {
      const templateParam = {
        from_email: "keikazuki0098@gmail.com",
        from_name: "Kei Sneaker Shop",
        to_name: name,
        email_to: email,
        message:
          "Your review is successfully submitted by our team , Thank You",
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
      const templateParam = {
        from_email: "keikazuki0098@gmail.com",
        from_name: "Kei_Sneaker Shop",
        to_name: name,
        to_email: email,
        message:
          "Your review is rejected from admin team because of some rules,Thank You",
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
            console.log("FAILED...", error.text);
          }
        );
    }

    
  };
  return (
    <div className="py-2 md:p-4 md:-ml-8 mt-14 ">
      <div className=" mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=dash"}>Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            <Link to={"/dashboard?tab=products"}>Reviews</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className=" flex items-center justify-between mb-5">
        <h1 className=" text-xl font-semibold ">
          Reviews{" "}
          <span className=" text-sm border p-2 py-1 bg-slate-200 rounded-md">
            {totalProduct}
          </span>
        </h1>
        <div className=" flex items-center gap-3">
          <div className=" flex items-center gap-2 text-sm">
            <span className=" hidden md:block">Sort By</span>
            <Select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value={"asc"}>
                <span className=" text-[12px]">Earlist</span>
              </option>
              <option value={"desc"}>
                <span className=" text-[16px]">Latest</span>
              </option>
            </Select>
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
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>UserName</Table.HeadCell>
            <Table.HeadCell>HeadLine</Table.HeadCell>
            <Table.HeadCell>Comment</Table.HeadCell>

            <Table.HeadCell>Created Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y ">
            {reviews?.map((shoe, index) => {
              return (
                <TableRev
                  data={shoe}
                  index={index}
                  key={index}
                  hadleSubmit={hadleSubmit}
                />
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

export default Reviews;
