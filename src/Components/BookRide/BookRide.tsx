import React from "react";
import "./BookRide.css";
import BookRideForm from "./BookRideForm";
import OfferedUserCard from "../OfferedUserCard";
import img4 from "../../assets/img4.png";
import Results from "./Results";
import Header from "../Header";
const BookRide = () => {
 const imagePath = img4;
  const bg = {
   
    backgroundImage: `url(${imagePath})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    height: "710px",
  };
  return (
    <div className="container-fluid bookRide" style={bg} >
      <Header />
      <BookRideForm />
      {/* <div className="row">
        <div className="BookRideForm col-lg-4">
          <div className="m-5">{<BookRideForm />}</div>
        </div>
        <div className="matchedResults col-lg-8  mt-5">{<Results />}</div>
      </div> */}
    </div>
  );
};

export default BookRide;
