import React, { useEffect } from 'react'
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearItems } from '../Slice/UserSlice';
const Success = () => {
  const location = useLocation();
const dispatch = useDispatch();
const{orders} =useSelector((state)=>state.user)
 
  useEffect(()=>{
    dispatch(clearItems());
    const serviceId = "service_k9o1uv6";
    const templateId = "template_8ubwbgk";
    const publicId = "X6YRhbzsQQO7nzaa9";

    let table='';
    let total=0;
    orders[orders.length-1]?.products?.map((pt)=>{
       total+=pt.price*pt.qty;
       table+=`<tr>
       <td style="padding: 8px;">${pt._id}</td>
       <td style="padding: 8px;"><img src=${pt.photos[0]} style="width:100px;height:100px" alt="" /></td>
      
       <td style="padding: 8px;">${pt.qty} X ${pt.name}</td>
       <td style="padding: 8px;">$${pt.qty* pt.price}</td>
       
   </tr>`
   
     })
  
     
   const templateParam = {
     from_email: "keikazuki0098@gmail.com",
     from_name: "Kei Sneaker Shop",
     to_name:  orders[orders.length-1].firstName + orders[orders.length-1].lastName,
     email_to: orders[orders.length-1].email,
     message: table,
     total : total,
     title : "Congratulation Dear Customer, your order is successfully placed order 🥂🥳"
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
  

  },[location.search])

   


  return (
    <div className="  w-full md:max-w-7xl mx-auto h-screen justify-center  flex flex-col ">
          <img src="https://kit8.net/wp-content/uploads/edd/2021/12/delivery_by_scooter_preview.jpg" alt=""  className=' w-96 h-auto mx-auto mix-blend-multiply'/>

          <div className=' text-center'>
            <h5 className=' text-2xl font-semibold'>Your order has been placed successfully</h5>
            <p className=' px-10 md:-x-3 md:w-1/2 mx-auto mt-4 text-[15px]'>Congratulation! Your order has been placed! A receipt has been sent to your email.Your order number is #{orders[orders.length-1]._id}</p>
            <div className=' mt-6'>
            <Link to={`/orders/${orders[0]}`}> <button className=' mx-2 border p-2 px-4 text-[14px] border-black rounded-lg cursor-pointer '>View Order</button></Link>
             <Link to={'/shops'}> <button className=' mx-2 border p-2 px-4 text-[14px] bg-black text-white rounded-lg cursor-pointer '>Continue Shopping</button></Link>
            </div>
          </div>
      </div>
  )
}

export default Success