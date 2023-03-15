import React from "react";
import BookedRides from "./BookedRides";
import OfferedRides from "./OfferedRides";
import "../RidesHistory/OfferedRides.css";
const MyRides = () => {

  return (
    <div className="row mt-2" >
      <div className="col-lg-4" style={{overflow:'visible'}}>
        <BookedRides />
      </div>
      <div className="col-lg-4" >
        <OfferedRides />
      </div>
    </div>
  );
};

export default MyRides;
