import React, { useEffect, useState } from "react";
import OfferedUserCard from "../OfferedUserCard";
import "./BookedRides.css";
import axios from "axios";
const BookedRides = () => {
  const [Data,setData]=useState([])
  const [result,setResult]=useState<boolean>(false)
  const type="BookRideHistory";
  useEffect(() => {
 
    fetchRides()
  
  }, [])
  const fetchRides= async()=>{
    const id= localStorage.getItem('userId')
    const token=localStorage.getItem("bearerToken");
    if(token!=null)
    {
      const response=await axios.get(`https://localhost:44350/api/UserRides/BookedRides/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
       setData(response.data)
    
    }

   }
  return (
    <div className="ms-5 mt-3 p-2">
      <div className=" p-1  text-center tag" >Booked Rides</div>
      {
        Array.from(Data).map((item,index)=>(
         <OfferedUserCard key={index} data={item}  type={type}/>
         
        ))
       }
    </div>
  );
};

export default BookedRides;
