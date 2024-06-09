import axios from "axios";
import { Checkbox } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { IncreaseCount ,DecreaseCount ,deleteItem } from "../Slice/UserSlice";
const CartItem = ({ data,setTotal }) => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(data?.qty);
const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = axios.get(
  //         `http://localhost:3000/product/getProducts?slug=${data?.slug}`,
  //         {
  //           headers: { "Content-Type": "application/json" },
  //           withCredentials: true,
  //         }
  //       );
  //       if (res.status === 200) {
  //         setProduct(res.data.shoes[0]);
  //       }
  //     } catch (error) {}
  //   };
  //   fetchData();
  // }, [data]);

  const changeHandler =(e)=>{
    alert(e)
  }
  return (
    <div className=" flex w-full gap-6">
      <div className=" flex items-center gap-3">
        <Checkbox />
        <div>
          <img
            src={data?.photos[0]}
            alt=""
            className=" h-32 object-cover w-32"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className=" mb-1 md:mb-2 flex w-full items-center justify-between">
          <div className=" text-lg md:text-xl font-semibold">{data?.name}</div>
          <div>
            <RxCross2 className=" text-xl cursor-pointer" onClick={()=>dispatch(deleteItem({_id:data?._id}))} />
          </div>
        </div>

        <div className=" flex  md:items-center justify-start md:justify-between flex-col md:flex-row gap-3 md:gap-0">
          <div className=" flex   flex-col">
            <div className="text-[14px] opacity-75">
              {data?.category}
            </div>
            <div className="text-[14px] opacity-75">
              <span>Size :</span>{data?.size} ,
              <span> Color :</span> {data?.color}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 border p-1 md:p-2 w-20 md:w-28 ">
              <FaMinus
                className=" cursor-pointer p-[3px]"
                style={{ width: "20px", height: "20px" }}
                onClick={() =>{setQty((prev) => prev > 0 ? prev - 1 : 0)
                    dispatch(DecreaseCount({_id : data?._id , qty : qty, color : data.color , size : data.size}))
                }}
              />
              <div>
                <input
                  min="1"
                  max="20"
                  value={qty}
                  
                  // onChange={(e)=>setAddItem({...addItem , qty : e.target.value})}
                  className=" text-center border-none rounded w-6 md:w-10  focus:border-none focus:outline-none text-[14px]"
                />
              </div>
              <FaPlus
                className=" cursor-pointer p-[3px]"
                style={{ width: "20px", height: "20px" }}
                onClick={() =>{
                   
                    setQty((prev) => prev + 1)
                    dispatch(IncreaseCount({_id : data?._id , qty : qty , color : data.color , size : data.size}))
                
                }}
              />
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-between mt-2 md:mt-6">
          <div className=" uppercase font-normal cursor-pointer underline text-[14px]">Move to the wishlist</div>
          <div className="font-medium text-[14px]">
            <span
              className={` ${
                data?.isOnSale && "line-through opacity-70 text-sm"
              }`}
            >
              ${data?.price * data?.qty}
            </span>
            {data?.isOnSale && (
              <span className="ms-3">${data?.onSalePrice * data?.qty}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
