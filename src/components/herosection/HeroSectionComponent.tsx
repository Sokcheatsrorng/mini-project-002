
"use client";
import { Carousel } from "flowbite-react";
export default function HeroSectionComponent() {
  return (
    <div className="relative h-screen rounded-none">
    <Carousel>
      <div className="flex h-full items-center justify-center" style={{ backgroundImage: 'url("https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2022/09/16114642/Modern-Car-Features-_-Cover-16-9-22.jpg")', backgroundSize: 'cover', backgroundPosition: 'center',opacity:'0.8' }}>
        <div className="text-center text-white" style={{opacity:'1'}}>
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to BLOCKCHAIN</h1>
          <p className="text-lg md:text-xl mt-4">Explore our innovative courses and stay updated with the latest technology trends.</p>
          <button className="mt-8 px-6 py-3 bg-blue-700 text-white rounded-md text-lg font-semibold hover:bg-blue-600">Get Started</button>
        </div>
      </div>
      <div className="flex h-full items-center justify-center" style={{ backgroundImage: 'url("https://cdn.wallpapersafari.com/67/35/AeaFvR.jpg")', backgroundSize: 'cover', backgroundPosition: 'center',opacity:'0.8'}}>
        <div className="text-center text-white" style={{opacity:'1'}}>
          <h1 className="text-4xl md:text-6xl font-bold">Learn Anywhere, Anytime</h1>
          <p className="text-lg md:text-xl mt-4">Our courses are designed to fit your schedule. Start learning today!</p>
          <button className="mt-8 px-6 py-3 bg-blue-700 text-white rounded-md text-lg font-semibold hover:bg-blue-600">Explore Courses</button>
        </div>
      </div>
      <div className="flex h-full items-center justify-center" style={{ backgroundImage: 'url("https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Model-S-Desktop-LHD-6.22.jpg")', backgroundSize: 'cover', backgroundPosition: 'center',opacity:'0.8' }}>
        <div className="text-center text-white" style={{opacity:'1'}
        }>
          <h1 className="text-4xl md:text-6xl font-bold">Join Our Community</h1>
          <p className="text-lg md:text-xl mt-4">Connect with professionals, share insights, and grow together.</p>
          <button className="mt-8 px-6 py-3 bg-blue-700 text-white rounded-md text-lg font-semibold hover:bg-blue-600">Join Now</button>
        </div>
      </div>
    </Carousel>
  </div>
  
  );
}
