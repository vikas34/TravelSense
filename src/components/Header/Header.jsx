import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="py-1 shadow-sm flex justify-between items-center px-7">
      <img
        src="./logo.png"
        style={{ height: "70px", width: "90px" }}
        alt=""
        srcset=""
      />
      <div>
        <Button className="cursor-pointer ">Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
