 import React from 'react'
 import { BsQuestionSquare } from "react-icons/bs";
 import { RxCross2 } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { Breadcrumb, Button, Select, Spinner, TextInput } from "flowbite-react";
 const Model = ({deleteUserHandler ,showModel,setShowModel}) => {
   return (
    <div className={`fixed h-full z-50 w-full top-0 -left-2 transition duration-500  ${showModel ? "visible opacity-100" : 'hidden opacity-0'} `} style={{ background: "rgba(0,0,0,0.3)" }} >
    <div className=" relative mx-auto flex flex-col  justify-center items-center mt-20 gap-8 bg-white  w-80 h-64 rounded-lg">
    <RxCross2  className=" absolute top-3 text-xl cursor-pointer right-4" onClick={()=>setShowModel(false)}/>
    <GoQuestion  className=" text-5xl text-red-600 " />
     <div className=" text-center font-semibold">
       Are You Sure To Delete This Item ? 
     </div>
     <div className=" flex items-center gap-3">
       <Button onClick={()=>setShowModel(false)}>Cancle</Button>
       <Button className=" bg-red-500" onClick={deleteUserHandler}>Delete</Button>
     </div>
    </div>

   </div>
    
   )
 }
 
 export default Model