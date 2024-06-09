import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const DisSection = () => {
  return (
    <div className='max-w-screen h-auto md:h-[500px] mt-20 flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap bg-[#EDEDED] relative'>
        <div className="max-w-full h-full object-cover ">
            <img src="https://d2t2u1vclegqzc.cloudfront.net/landing/1/tons_of_design.jpg?v=1668715239" className=' h-full object-contain' alt="" />
        </div>
        <div className=' relative w-full md:w-auto h-full flex items-center md:items-start flex-col px-6 md:px-0 text-center md:text-left '>
            <h1 className=' mt-24 md:mt-40  text-5xl md:text-6xl font-semibold'>The Best Selling</h1>
            <div className=' mt-6 w-full text-center md:text-left  md:w-2/3 text-[16px]'>Find various styles for shoes that everyone look for</div>

            {/* <div className=' mt-6 cursor-pointer flex  text-base   gap-3 font-medium hover:border-b-2 border-black w-28'><span>Shop Now</span> <FaArrowRight /></div> */}
            <div className="mt-5 shadow-md text-sm bg-white text-black p-3  rounded-full inline max-w-24  cursor-pointer ">
              Shop Now
            </div>
        </div>
    </div>
  )
}

export default DisSection