import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import {loadStripe} from '@stripe/stripe-js';
import { Checkbox, TextInput } from "flowbite-react";

import axios from "axios";
import { addOrder, clearItems, deleteItem } from "../Slice/UserSlice";
const CheckOut = () => {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.user);
   const [formData , setFormData] = useState(null)
  let totalPrice=0;

  userCart.map((ct, index) => {
    if(ct.isOnSale){
      totalPrice+=ct.qty*ct.onSalePrice;
    }else{
      totalPrice+=ct.qty*ct.price;
    }
  
    
  })

  const saveCheckOut=async(e)=>{
    e.preventDefault();
    const stript = await loadStripe('pk_test_51PMiKq056niaF0IxB4eS8iHvO1xtkHllc6arBJGkRiPd5qJ2IhlgF5CmYEyaM4EIv2KaC6lCmR9Dle2NHsJdcA8J00iXnwK7lc');
    const body = {
        product : userCart,
        data : formData,
        total : totalPrice
    }

    try {
        const session = await axios.post('https://keisneaker-8da6.onrender.com/product/checkout-session',body ,{
            headers : {'Content-Type' : 'application/json'}
        })
  
         
        if(session.status===200){
          dispatch(addOrder(session.data.order))
          stript.redirectToCheckout({
            sessionId : session.data.id
        })
        
       
           
        }
        
    } catch (error) {
        
    }

  }
   
  return (
    <div className=" mt-28  w-full px-5 md:max-w-6xl mx-auto  flex flex-col ">
      <div className=" text-2xl md:text-3xl uppercase font-semibold " style={{letterSpacing:1.5}}>Shipping & Delivery</div>

      <div className=" flex  w-full mt-6 flex-col md:flex-row  gap-3 ">
        <div className="w-full md:w-2/3 flex flex-col gap-4 bg-white p-5 rounded-lg">
            <form className=" flex flex-col gap-4" onSubmit={saveCheckOut}>
                <TextInput placeholder="First Name" className=" " onChange={(e)=>setFormData({...formData , firstName : e.target.value})} required/>
                <TextInput placeholder="Last Name" onChange={(e)=>setFormData({...formData , lastName : e.target.value})} required/>
                <TextInput placeholder="Address 1" onChange={(e)=>setFormData({...formData , address1 : e.target.value})} required/>
                <TextInput placeholder="Address 2 (Optional)" onChange={(e)=>setFormData({...formData , address2 : e.target.value})}  />
                <TextInput placeholder="City" onChange={(e)=>setFormData({...formData , city : e.target.value})} required/>
                <div className=" flex justify-between gap-3">
                <TextInput placeholder="State *" className=" flex-1" onChange={(e)=>setFormData({...formData , state : e.target.value})} required/>
                <TextInput type="number" maxLength={6} placeholder="Zip Code" className=" flex-1" onChange={(e)=>setFormData({...formData , zip : e.target.value})} required/>
                </div>
                <TextInput type="number" placeholder="Phone *" onChange={(e)=>setFormData({...formData , phone : e.target.value})} required />
                <TextInput type="email"  placeholder="Email" onChange={(e)=>setFormData({...formData , email : e.target.value})} required />

                <div  className=" items-center flex gap-2">
                    <Checkbox />
                    <span>
                    Please send me emails with offers and updates from family
                    </span>
                </div>

                <button
            type="submit"
             className="w-full mt-4  text-center py-2 md:py-3 bg-black rounded  cursor-pointer  border text-white transition duration-500 hover:bg-white uppercase text-[16px] md:text-sm hover:border-black hover:text-black flex items-center justify-center gap-2"
               
           >
             
             <span >Save & Continue</span>
           </button>
            </form>
          
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
                <span  className=" text-[14px]">{userCart.length > 0 ? '$30' : "$0"}</span>
              </div>

              <hr />
              <div className=" mt-2 flex items-center justify-between">
                <span className=" uppercase text-[14px]">Total</span>
                <span  className=" text-[14px]">${totalPrice+30}</span>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
