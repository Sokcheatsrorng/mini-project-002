
"use client";

import { usePathname } from "next/navigation";
import { Footer} from "flowbite-react";
import { CiTwitter } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterComponent() {
  const pathname = usePathname();
  if (pathname.includes("/dashboard" ||  "/signup")) return null;
  else
  return (
    <Footer container className="bg-gray-900 rounded-none ">
    <div className="w-full">
      <div className=" w-[90%] mx-auto p-0">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <img src="https://store.istad.co/media/brand_images/blockchain_logo_20zXVzP.png" alt="blockchain_logo" className="w-[100px] h-[100px]"/>
            <p className="blockchain-quotes mt-3 text-white">
              Start your dream driver with<br></br> BLOCKCHAIN
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8  sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Learn More" className="text-white" />
              <Footer.LinkGroup col className="text-gray-100">
                <Footer.Link href="#">About Us</Footer.Link>
                <Footer.Link href="#">Products</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">FQA</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact us" className="text-white" />
              <Footer.LinkGroup col className="text-gray-100">
                <Footer.Link href="#">(+855) 95-990-910</Footer.Link>
                <Footer.Link href="#">(+855) 93-990-910</Footer.Link>
                <Footer.LinkGroup className="flex text-gray-100 items-center">
                 
                </Footer.LinkGroup>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" className="text-white" />
              <Footer.LinkGroup col>
                <div className="row inline-flex gap-3">
                <CiFacebook  className="text-white text-2xl"/>
                <CiTwitter  className="text-white text-2xl"/>
                < CiInstagram className="text-white text-2xl"/>
                </div>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full text-white sm:flex sm:items-center sm:justify-between">
          <p className="mx-auto">
            ©<span>2024</span>
            <span>
              Center of Science and Technology Advanced Development | All
              Rights Reserved
            </span>
          </p>
        </div>
      </div>
    </div>
  </Footer>
  );
}
