import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { MdCardGiftcard } from "react-icons/md";
const Keyfeatures = () => {
  return (
    <div className=' mt-20  w-full md:max-w-7xl mx-auto  flex flex-col '>
        <h1 className=' text-center text-3xl font-semibold  md:mb-8  uppercase'>Our Service</h1>
        <div className="flex flex-col md:flex-row p-5">
        <div className='w-full md:w-1/4 p-3 md:p-5 text-center flex flex-col justify-center items-center border  md:border-r-0'>
            <TbTruckDelivery className=' text-4xl mb-2'/> 
            <div className=' font-semibold'>
            Fast, Free Shipping 
            </div>
            <div className=' text-sm my-4 ' style={{lineHeight : 1.5}}>
            Orders over $75 ship for free. Or sign up for a Converse.com account and get free shipping on every order.
            </div>
            <div className=' text-sm font-semibold hover:underline cursor-pointer'>Learn More</div>
        </div>
        <div className=' w-full md:w-1/4 p-3 md:p-5  text-center flex flex-col justify-center items-center border md:border-r-0'>
            <BsBoxSeam className=' text-4xl mb-2'/> 
            <div className=' font-semibold'>
           Box Packaging
            </div>
            <div className=' text-sm my-4 ' style={{lineHeight : 1.5}}>
            We always provide the best shipping packaging security for you so that the goods are not easily damaged.
            
            </div>
            <div className=' text-sm font-semibold hover:underline cursor-pointer'>Learn More</div>
        </div>
        <div className=' w-full md:w-1/4 p-3 md:p-5 text-center flex flex-col justify-center items-center border md:border-r-0'>
            <MdCardGiftcard className=' text-4xl mb-2'/> 
            <div className=' font-semibold'>
            Gift Rewards
            </div>
            <div className=' text-sm my-4 ' style={{lineHeight : 1.5}}>
            Every purchases of high-preicd shoes or high-priced shoes will get a special hologram pack sticker fom our store.
            </div>
            <div className=' text-sm font-semibold hover:underline cursor-pointer'>Learn More</div>
        </div>
        <div className=' w-full md:w-1/4 p-3 md:p-5  text-center flex flex-col justify-center items-center border'>
            <CiTimer className=' text-4xl mb-2'/> 
            <div className=' font-semibold'>
             Worry,Free Return
            </div>
            <div className=' text-sm my-4 ' style={{lineHeight : 1.5}}>
            If you are not satified our products and We will return or exchange your purchase for free within 30 days.
            </div>
            <div className=' text-sm font-semibold hover:underline cursor-pointer'>Learn More</div>
        </div>
         
        </div>
    </div>
  )
}

export default Keyfeatures