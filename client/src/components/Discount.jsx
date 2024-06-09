import React, { useState } from 'react'
import { BsQuestionSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { Breadcrumb, Button, Label, Select, Spinner, TextInput } from "flowbite-react";
 
const Discount = ({ showDiscount,setShowDiscount,discountSubmit,currentPrice}) => {
    const [discount,setDiscount]=useState(0);
    const [discountPrice , setDiscountPrice] = useState(0);
 
  return (
   <div className={`fixed h-full  z-50 w-full top-0 -left-2 transition duration-500  ${showDiscount ? "visible opacity-100" : 'hidden opacity-0'} `} style={{ background: "rgba(0,0,0,0.3)" }} >
   <div className=" relative mx-auto flex flex-col p-6    mt-20  bg-white  w-80 h-auto rounded-lg">
   <RxCross2  className=" absolute top-3 text-xl cursor-pointer right-4" onClick={()=>setShowDiscount(false)}/>
    <div className=' text-lg capitalize my-2 font-medium'>add discount</div>
     <form action="" className='text-left flex flex-col gap-2'>
       <div>
       <Label>Discount Percent</Label>
        <TextInput type='number' placeholder='Enter Percent' className='mt-2' required onChange={(e)=>{setDiscount(e.target.value),setDiscountPrice(currentPrice-(e.target.value%100))}} />
       </div>
       <div>
       <Label>Discount Price</Label>
        <TextInput placeholder='Enter Price'
        value={currentPrice-(discount%100)}
         disabled className='mt-2'  required/>
       </div>
     </form>
    <div className=" flex items-center gap-3 mt-4">
      <Button onClick={()=>setShowDiscount(false)} className='bg-black'>Cancle</Button>
      <Button className=" bg-cyan-500" onClick={()=>discountSubmit(discount,discountPrice)}>Submit</Button>
    </div>
   </div>

  </div>
   
  )
}

export default Discount