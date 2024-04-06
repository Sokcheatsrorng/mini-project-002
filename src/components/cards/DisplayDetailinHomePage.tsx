
import React from 'react'
import { Poppins } from 'next/font/google';

export default function DisplayDetailinHomePage() {
  return (
    <div className="w-full mt-20 p-8 text-center overflow-hidden ">
    <div className="px-6 py-4 ">
      <div className="text-2xl mb-2">SKILLFUL HANDS ARE KEY TO CREATING A RICH <br/> SOPHISTICATED SPACE INSIDE</div>
      <p className="text-base text-center">
        Interior is a space where drivers and passengers get in touch with and feel the car. <br/>That is why we pay meticulous attention to details in the cabin space.<br/> Because we know that spending time in the cabin <br/> adds to their joy and emotional attachment to the car. 
      </p>
    </div>
    <div className=" md:w-[75%]  overflow-hidden mx-auto justify-center items-center flex w-full">
          <div className="h-full mx-auto justify-center items-center">
          <img src="https://com.mazdacdn.com/common/en/assets/innovation/design/img/en_innovation_design_1cal_02.ts.2007200400210000.jpg" alt="" />
          </div>
    </div>
  </div>
  )
}

