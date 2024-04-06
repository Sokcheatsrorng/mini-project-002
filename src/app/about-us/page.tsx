import React from "react";
import Image from "next/image";
export default function page() {
  return (
    <>
      <div className="w-[80%] h-[500px] mx-auto">
        <img
          src="https://scene7.toyota.eu/is/image/toyotaeurope/grsupraiconimage?wid=1280&fit=fit,1&ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0"
          alt=""
          className="w-full h-full object-container"
        />
      </div>
      <h1 className="text-center text-4xl mb-20">ABOUT US</h1>

      <div className="w-[65%] h-[500px]  mx-auto grid md:grid-cols-2 grid-cols-1 gap-4 rounded-lg overflow-hidden mb-20">
        <div className="h-full ">
          <img
            src="https://www.deutschland.de/sites/default/files/media/image/tdt_15052020_wie_familien_in_deutschland_leben_gemeinsam.jpg"
            alt="Family enjoying time together"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="overflow-hidden bg-blue-400 flex flex-col justify-center px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Providing Comfortable Spaces for Families
          </h1>
          <p className="text-lg md:text-xl text-white">
            The BLOKCHAIN provides safety and comfort, ensuring that families
            can travel comfortably, reduce stress associated with transportation
            challenges, and promote a positive mindset conducive to overall
            health.
          </p>
        </div>
      </div>
    </>
  );
}
