import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import landing from "@/assets/landing.png";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551] block mb-2">
          Plan Your Perfect Trip Effortlessly with AI{" "}
        </span>
        WanderWise
      </h1>

      <p className="text-xl text-gray-500 text-center">
        Your intelligent travel companion — crafting personalized itineraries
        based on your preferences, budget, and style.
      </p>

      <Link to={"/create-trip"}>
        <Button> Get Started </Button>
      </Link>

      <img src={landing} />
    </div>
  );
}

export default Hero;
