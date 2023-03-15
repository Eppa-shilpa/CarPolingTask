import React, { useState } from 'react'
import { VscCircleFilled } from "react-icons/Vsc";
import { MdLocationOn } from "react-icons/Md";
import { useNavigate } from 'react-router-dom'
import "./OfferRideStops.css";
import axios from 'axios';
const OfferRideStops = (props: any) => {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState("inline");
  const [icon, setIcon] = useState(false)
  const [stop1name, setStop1name] = useState<string>("")
  const [seatsRequired, setSeatsRequired] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [left, setLeft] = useState('-45px')
  const [stopList, setStopList] = useState<{ name: string, plusButton: boolean }[]>([{ name: "", plusButton: true }]);
  const url = "https://localhost:44350/api/OfferRide/RideDetails";
  const dot = { color: "rgb(171, 173, 175)", fontSize: "1.3em" };
  const nav = useNavigate()
  const stopStyle = {
    position: 'relative',
    left: left

  };
  const style = {
    display: visible,
  };
  const scrollable = {
    overflow: "scroll"

  };
  const onSubmit = async (e: any) => {
    const id = localStorage.getItem('userId')
    e.preventDefault()
    const StopsList: string[] = [];
    stopList.forEach(element => {
      StopsList.push(element.name)
    });
    const formData = {
      "sourceId": props.data.source,
      "destinationId": props.data.destination,
      "date": props.data.date,
      "time": props.data.time,
      "stops": StopsList,
      "seats": seatsRequired,
      "fare": price,
      "userId": id
    };
    const headers = { 'content-type': 'application/json' };
    const token = localStorage.getItem("bearerToken");
    if (token != null) {
      axios.post(url, formData,
        { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
          console.log("response", response);
        }).catch(error => console.log(error))
      alert("ride Offered Successfully")
      nav('/Menu')
    }

  }
  const addStop = () => {
    const newStop = { name: "", plusButton: true };
    setStopList([...stopList, newStop]);
  }
  const handleStop = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const list: { name: string, plusButton: boolean }[] = stopList;
    list[index].name = e.currentTarget.value;
    list[index].plusButton = true;
    setStopList(list);
  }
  return (
    <div className="OfferRideForm" id="stops" >
      <div className="header">
        <h2>Offer a Ride</h2>
        <p className="tagLine">we get you the matches asap !</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-check form-switch switch">
          <input className="form-check-input " type="checkbox" id="flexSwitchCheckChecked " />
        </div>
        {/* <VscCircleFilled style={ { fontSize: "1.7em",position: 'relative', left: '290px',color: "rgb(100, 51, 146)"}}/> */}
        {/* <VscCircleFilled style={ { color: "rgb(171, 173, 175)", fontSize: "1.2em",position: 'relative', left: '245px'}}/> */}
        <div className="row" >
          <div className="col-10">
            {
              stopList.map((item, index) => {
                return (
                  <div key={index} >
                    <label className="labelName " >Stop {index + 1}</label>    <br />
                    <input type="text" id="" className="inputfield mb-2 stopInput" onChange={(e) => { handleStop(e, index) }} required />
                    {item.plusButton && <button className='border border-0 fs-2 btn btn-transparent ' onClick={() => { addStop(), item.plusButton = false, setIcon(true) }}>+</button>}
                    {/* {!(item.plusButton)?<VscCircleFilled style={{ color: "rgb(171, 173, 175)", fontSize: "1.2em",position: 'relative', left: '0px'}}/>:null} */}
                  </div>
                )
              })
            }
          </div>
          <div className="col-2">
            <VscCircleFilled style={{ fontSize: '1.8em', color: "rgb(100, 51, 146)" }} /> <br />
            {
              stopList.map((item, index) => {
                return (
                  <div>
                    <VscCircleFilled style={dot} /> <br />
                    <VscCircleFilled style={dot} /><br />

                  </div>
                )
              })
            }

            <MdLocationOn style={{ fontSize: '1.8em', color: "rgb(100, 51, 146)" }} />
            {/* <VscCircleFilled style={ { fontSize: "1.7em",position: 'relative', left: '290px',color: "rgb(100, 51, 146)"}}/> <br />
          <MdLocationOn style={ { fontSize: "1.5em",position: 'relative', left: '290px',color: "rgb(100, 51, 146)"}} /> */}
          </div>
        </div>

        {/* <MdLocationOn style={ { fontSize: "1.5em",position: 'relative', left: '290px',color: "rgb(100, 51, 146)"}} /> */}
        <div className="row">
          <div className="col-lg-6">
            <div className="fromLabel">
              {/* <input type="button" value="1" name="seats" className='seats' onClick={() => { setSeatsRequired(1) }} />
              <input type="button" value="2" name="seats" className='seats' onClick={() => { setSeatsRequired(2) }} />
              <input type="button" value="3" name="seats" className='seats' onClick={() => { setSeatsRequired(3) }} /> */}
              <label className="labelName">Available Seats</label> <br />
              <div className="radiotoolbar">

                <input type="radio" id="oneSeat" name="seats" value="1" required />
                <label htmlFor="oneSeat" className='seats' onClick={() => setSeatsRequired(1)}>1</label>

                <input type="radio" id="twoSeats" name="seats" value="2" />
                <label htmlFor="twoSeats" className='seats' onClick={() => setSeatsRequired(2)}>2</label>

                <input type="radio" id="threeSeats" name="seats" value="3" />
                <label htmlFor="threeSeats" className='seats' onClick={() => setSeatsRequired(3)}>3</label>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-label">
              <label id="label" className="labelName ms-1"  >Price</label> <br />
              <span>
                $<input type='number' className="inputfield mb-2 pricetag" name="price" onChange={(e) => setPrice(e.target.valueAsNumber)} />
              </span>
            </div>
          </div>
        </div>
        <input type="submit" value="Submit" id="submitButton" className="mt-3" />
      </form>
    </div>
  )
}

export default OfferRideStops