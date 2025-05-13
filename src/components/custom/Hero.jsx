import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551] block mb-2">Make Your Trips Planning Easier with AI </span> 
        WanderWise 
      </h1>
      
      <p className="text-xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

      <Link to={'/create-trip'}>
        <Button> Get Started </Button>
      </Link>

      <img src='/src/assets/landing.png' className='' />
      
    </div>
  );
}

export default Hero;
