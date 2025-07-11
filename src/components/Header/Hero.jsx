import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex items-center gap-9 mx-56 flex-col">
      <h1 className="font-extrabold text-[50px] text-center mt-16 ">
        {" "}
        <span className="text-[#f56551]">
          Discover Your Next Advanture with AI:
        </span>{" "}
        Personalized Itiniries @ Your fingertips.{" "}
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Button> Get Started It's Free</Button>
    </div>
  );
};

export default Hero;
