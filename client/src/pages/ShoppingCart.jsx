import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { userCart } = useSelector((state) => state.user);
  const [ total ,setTotal]=useState(0)
  let totalPrice=0;
  const navigate = useNavigate();
  return (
    <div className="mt-28  w-full px-5 md:max-w-6xl mx-auto  flex flex-col ">
      <div className=" text-2xl md:text-3xl uppercase font-semibold ">Your Cart</div>

      <div className=" flex  w-full mt-6 flex-col md:flex-row  gap-3">
        <div className="w-full md:w-2/3 flex flex-col gap-4">
         {
          userCart.length > 0 ? (
            <div>
               {userCart.map((ct, index) => {
            if(ct.isOnSale){
              totalPrice+=ct.qty*ct.onSalePrice;
            }else{
              totalPrice+=ct.qty*ct.price;
            }
          
            return <CartItem data={ct} key={index} setTotal={setTotal} />;
          })}
          </div>
          ) : (
            <div>Your cart is empty !</div>
          )
         }
        </div>
        <div className="w-full md:w-1/3 h-full flex ms-2 mt-6 md:mt-0 md:ms-32 items-start">
          <div className="w-full border border-black p-5">
            <h2 className=" uppercase font-medium"> order summary</h2>

            <div className=" mt-2  md:w-60">
              <div className=" mt-3 flex items-center justify-between">
                <span className=" uppercase text-[14px]">Subtotal</span>
                <span className=" text-[14px]">${totalPrice}</span>
              </div>
              <div className=" mt-1 flex items-center justify-between pb-6">
                <span className=" uppercase text-[14px]">TEXT</span>
                <span  className=" text-[14px]">{userCart.length  > 0 ? "$30" : "$0"}</span>
              </div>

              <hr />
              <div className=" mt-2 flex items-center justify-between">
                <span className=" uppercase text-[14px]">Total</span>
                {
                  userCart.length > 0 ? (
                    <span  className="text-[14px]">${totalPrice+30}</span>
                  ) : (
<span  className="text-[14px]">${totalPrice}</span>
                  )
                }
              </div>

              <button
              disabled ={userCart.length > 0 ? false : true}
             
              className={`w-full mt-4  text-center py-2 md:py-3 bg-black rounded   border text-white transition duration-500 hover:bg-white uppercase text-[16px] md:text-sm hover:border-black hover:text-black flex items-center justify-center gap-2 ${userCart.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={()=>navigate('/shipping')}
            >
              
              <span  >Check Out</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
