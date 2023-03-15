import React from "react";
import OfferedUserCard from "../OfferedUserCard";
import MatchedResults from "./MatchedResults";
import './Results.css'
type prototype1={
  data:{
    date : string;
    destination:number;
    fare:number;
    offerRideId:number;
    seatsAvailable:number;
    seatsBooked:number;
    source:number;
    time:string;
    userId:number;
  }[]
}
type prototype2={
  date : string;
  destination:number;
  fare:number;
  offerRideId:number;
  seatsAvailable:number;
  seatsBooked:number;
  source:number;
  time:string;
  userId:number;
}
const Results = (props:prototype1) => {
  return (
    <div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "rgb(100, 51, 146)",
       
        }}
      >
        Your Matches
      </h1>
      <div style={{width:'200px'}} className="resultsdiv">
      {
        Array.from(props.data).map((item:prototype2,index)=>{
          return item.seatsAvailable-item.seatsBooked>0 && item.userId!=Number(localStorage.getItem("userId")) ?  (<MatchedResults key={index} data={item}  />):null
        }
        )
       }
        </div>
    </div>
  );
};

export default Results;
