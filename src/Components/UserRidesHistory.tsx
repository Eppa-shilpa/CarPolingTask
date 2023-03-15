import React, { useState } from "react";
import Header from "./Header";
import MyRides from "./RidesHistory/MyRides";
import img4 from "../assets/img4.png";
import './UserRidesHistory.css'
const User = () => {
  const imagePath = img4;
  const bg = {
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    height: "710px",
  };
  return (
    <div style={bg} className="image">
     <Header/>
      <MyRides />
    </div>
  );
};

export default User;
