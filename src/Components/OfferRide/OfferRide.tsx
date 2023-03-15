import React from "react";
import Header from "../Header";
import OfferRideForm from "./OfferRideForm";
import OfferRideStops from "./OfferRideStops";
import img4 from "../../assets/img4.png";
import './OfferRide.css'
const OfferRide = () => {
  const imagePath = img4;
  const bg = {
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    height: "710px",
    
  };
  return (
    <div className="container-fluid offerRide" style={bg}>
      <Header />
      <OfferRideForm />
    </div>
  );
};

export default OfferRide;
