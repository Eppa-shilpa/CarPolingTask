import React, { useEffect, useState } from "react";
import "./OfferedUserCard.css";
import { VscCircleFilled } from "react-icons/Vsc";
import { MdLocationOn } from "react-icons/Md";
import axios from "axios";
const OfferedUserCard = (props:any) => {
  const style = { color: "rgb(100, 51, 146)", fontSize: "1.5em" };
  const dot = { color: "rgb(171, 173, 175)" };
  const [source,setSource]=useState("")
  const [destination,setDestination]=useState("")
  const [userName,setUserName]=useState("")
  const date:string=props.data?.date.substring(2, 10);
  const[first,setFirst]=useState("")
  useEffect(() => {
  const sId:number=props.data?.source;
  const dId:number=props.data?.destination;
  const userId:number=props.data?.userId;
  const token=localStorage.getItem("bearerToken");
  if(token!=null)
  {  const bearerToken:string=token;
    if(sId>0&&dId>0)
    {
   axios.get(`https://localhost:44350/api/Locations/${sId}`, { headers: {"Authorization" : `Bearer ${bearerToken}`} })
           .then(response1 => { setSource(response1.data)})
           axios.get(`https://localhost:44350/api/Locations/${dId}`,{ headers: {"Authorization" : `Bearer ${bearerToken}`} })
           .then(response2 => {  setDestination(response2.data)})
    }
    if(userId>0)
    {
      console.log("userId",userId)
      axios.get(`https://localhost:44350/api/User/${userId}`,{ headers: {"Authorization" : `Bearer ${bearerToken}`} })
      .then(response=>{setUserName(response.data)})
    }
  }


        
     }, [first])

  return (
    <div>
      <div className="userCard">
        <div className="row">
          <div className="col-lg-9  ">
            <h2>{userName}</h2>
          </div>
          <div className="col-lg-3  ">
            <img src="src\assets\userIcon.jpeg" id="profilePic" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 label ">From</div>
          <div className="col-lg-6 label ">To</div>
        </div>
        <div className="row">
          <div className="col-lg-6 rideData"> {source.trim()} <VscCircleFilled style={style} />
            <VscCircleFilled style={dot} />
            <VscCircleFilled style={dot} />
            <VscCircleFilled style={dot} />
            <MdLocationOn style={style} />
          </div>
          <div className="col-lg-6 rideData">{destination.trim()}</div>
        </div>
        <div className="row">
          <div className="col-lg-6 label">Date</div>
          <div className="col-lg-6 label">Time</div>
        </div>
        <div className="row">
          <div className="col-lg-6">{date}</div>
          <div className="col-lg-6">{props.data?.time}</div>
        </div>
        <div className="row">
          <div className="col-lg-6 label">Price</div>
          <div className="col-lg-6 label">Seats</div>
        </div>
        <div className="row">
          <div className="col-lg-6">${props.data?.fare}</div>
          <div className="col-lg-6">{props.data?.seatsAvailable}</div>
        </div>
      </div>
    </div>
  );
};

export default OfferedUserCard;
