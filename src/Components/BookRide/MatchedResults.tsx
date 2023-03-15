import React, { useEffect, useState } from "react";
import "./MatchedResults.css";
import { useNavigate } from 'react-router-dom'
import { VscCircleFilled } from "react-icons/Vsc";
import { MdLocationOn } from "react-icons/Md";
import axios from "axios";
type prototype2={
  data:{date : string;
    destination:number;
    fare:number;
    offerRideId:number;
    seatsAvailable:number;
    seatsBooked:number;
    source:number;
    time:string;
    userId:number;}
  
}
const MatchedResults = (props:prototype2) => {
    const nav = useNavigate()
  const style = { color: "rgb(100, 51, 146)", fontSize: "1.5em" };
  const dot = { color: "rgb(171, 173, 175)" };
  const [visibility,setVisility]=useState(false)
  const [source,setSource]=useState("")
  const [destination,setDestination]=useState("")
  const [avaliableSeats,setAvaliableSeats]=useState<number>(props.data.seatsAvailable-props.data.seatsBooked)
  const date=props.data.date;
  const subdate:string=props.data.date.substring(2, 10);
  const [userName,setUserName]=useState("")
  const time=props.data.time;
  const fare=props.data.fare;
  const seats=props.data.seatsAvailable;
  const[first,setFirst]=useState("")
  const [count,setCount]=useState(1)
  const [activityChanged, setActivityChanged] = useState(false);
 const ShowBookButton=()=>{
  setVisility(true);
  console.log(visibility)
 }
  useEffect(() => {

  const sId:number=props.data.source;
  const dId:number=props.data.destination;
  const userId:number=props.data.userId;
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
      axios.get(`https://localhost:44350/api/User/${userId}`,{ headers: {"Authorization" : `Bearer ${bearerToken}`} })
      .then(response=>{setUserName(response.data)})
    }
  }
        
     }, [first])
     
const BookRide=async ()=>{
    console.log("clicked")
   const OfferRideId:number= props.data.offerRideId;
    const BookedUserId=localStorage.getItem("userId")
    const sId:number=props.data.source;
  const dId:number=props.data.destination;
  const token=localStorage.getItem("bearerToken");
  if(token!=null)
  {

    const response = await axios.post("https://localhost:44350/api/BookRide", { 
      "sourceId": sId,
      "destinationId": dId,
      "date": date,
      "time": time,
      "bookedUserId": BookedUserId,
      "offerRideId": OfferRideId ,
      "SeatsBooked":count,
      "TotalPrice":count*fare
    },
      { headers: {"Authorization" : `Bearer ${token}`} }
      )
        alert("ride Booked Successfully !!")
      nav('/MyRides')
  }
 
}
  return (
    <div>
      <div className="userCard " style={{height:'fit-content'}} onClick={ShowBookButton} >
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
          <div className="col-lg-6">{subdate}</div>
          <div className="col-lg-6">{props.data.time}</div>
        </div>
        <div className="row">
          <div className="col-lg-6 label">Price</div>
          <div className="col-lg-6 label">Seat Availability</div>
        </div>
        <div className="row">
          <div className="col-lg-6">${props.data.fare}</div>
          <div className="col-lg-6">{avaliableSeats}</div>
        </div>
        
        {visibility?   <div className="row" >
        <div className="col-lg-6">     
          <label htmlFor="" className="label">seats</label> <input type="number" name="seats" id="seats" value={count} onChange={e=>{
            setActivityChanged(true)
            setCount(e.target.valueAsNumber)
            if(Number.isNaN(e.target.valueAsNumber))
            {
              setActivityChanged(true)
              return
            }
              if(e.target.valueAsNumber<=avaliableSeats&&e.target.valueAsNumber>0)
              {
                setActivityChanged(false)
              }
            }}/>
          </div>
          <div className="col-lg-6">
            <button className="btn btn-primary" disabled={activityChanged} onClick={BookRide}>Book</button>
          </div>
        </div>: <></>}
      
      </div>
    </div>
  );
};

export default MatchedResults;
