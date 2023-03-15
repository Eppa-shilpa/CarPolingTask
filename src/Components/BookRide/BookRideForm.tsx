import React, { useEffect, useState } from 'react'
import "./BookRideForm.css";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { VscCircleFilled } from "react-icons/Vsc";
import { MdLocationOn } from "react-icons/Md";
import axios from 'axios';
import Results from './Results';
const OfferRideForm = () => {
  const nav = useNavigate()
  const style = { color: "rgb(100, 51, 146)", fontSize: "1.5em" };
  const dot = { color: "rgb(171, 173, 175)", fontSize: "1.2em" };
  const [Locations, setlocations] = useState<{ locationId: number, locationName: string, disabled: boolean }[]>([{ locationId: 0, locationName: "", disabled: true }])
  const [nextpage, setNextPage] = useState(false);
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [Data, setData] = useState([])
  const [res, setRes] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("bearerToken");
    axios.get(`https://localhost:44350/api/Locations`, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        response.data.map((object: { locationId: number, locationName: string }) => {
          setlocations((Locations) => [
            ...Locations,
            {
              locationId: object.locationId,
              locationName: object.locationName,
              disabled: false
            }
          ]);
        });
      });
  }, [])

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const sourceId: number = Number(source)
    const destinationId: number = Number(destination)
    const token = localStorage.getItem("bearerToken");
    console.log(time)
    const header = `Authorization: Bearer ${token}`;
    const response = await axios.get(`https://localhost:44350/api/OfferRide/MatchedResults`, { headers: { "Authorization": `Bearer ${token}` }, params: { SourceId: sourceId, DestinationId: destinationId, Date: date, Time: time } });
    setData(response.data)
    if (response.data.length > 0) {
      setNextPage(true)
    }
    else {
      setRes(true)
    }
  }
  return (
    <div className="row ride">
      <div className='BookRideForm col-lg-4'>
        <div className="m-5">
          <div className="OfferRideForm">
            <div className="header">
              <h2>Book a Ride</h2>
              <p className="tagLine">we get you the matches asap !</p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-check form-switch switch">
                <input className="form-check-input switchWidth " type="checkbox" id="flexSwitchCheckChecked  " defaultChecked onChange={() => nav("/OfferRide")} />
              </div>
              <div className="formLabel">
                <label id="label" className="labelName" htmlFor='source'>From</label>
                <span id="icon1"> <VscCircleFilled style={style} /></span>   <br />
                <select name="source" className='location' onChange={e => setSource(e.target.value)} required aria-label='label'>
                  {
                    (Locations.filter(ele => ele.locationId != Number(destination))).map((item, index) => {
                      return <option key={index} value={item.locationId} disabled={item.disabled}>{item.locationName}</option>
                    })
                  }
                </select>
                <VscCircleFilled style={dot} />
              </div>
              <div className="form-label">
                <label className="labelName" htmlFor='destination'>To</label>
                <span id="icon2"><VscCircleFilled style={dot} /></span>  <br />
                <select name="destination" className='location' onChange={e => setDestination(e.target.value)} required>
                  {
                    (Locations.filter(ele => ele.locationId != Number(source))).map((item, index) => {
                      return <option key={index} value={item.locationId} disabled={item.disabled}>{item.locationName}</option>
                    })
                  }
                </select>
                <MdLocationOn style={style} />
              </div>
              <div className="formLabel">
                <label className="mb-1 labelName" htmlFor='date'>Date</label>
                <br />
                <input type="date" name="" id="date" className="inputfield mb-2" placeholder="xx/mm/yyyy" onChange={(e) => setDate(e.target.value)} required />
                <br />
              </div>
              <div className="formLabel">
                {/* <label className="labelName">Time</label> <br />
                <input type="button" value="5am-9am" name="timeslot" className="time" onClick={() => setTime("5am-9am")} required/>
                <input type="button" value="9am-12pm" name="timeslot" className="time" onClick={() => setTime("9am-12pm")} />
                <input type="button" value="12pm-3pm" name="timeslot" className="time" onClick={() => setTime("12pm-3pm")} />
                <input type="button" value="3pm-6pm" name="timeslot" className="time" onClick={() => setTime("3pm-6pm")} />
                <input type="button" value="6pm-9pm" name="timeslot" className="time" onClick={() => setTime("6pm-9pm")} /> */}
                <label className="labelName">Time</label> <br />
                <div className="radio-toolbar">

                  <input type="radio" id="timing1" name="timeslot" value="5am-9am" />
                  <label htmlFor="timing1" onClick={() => setTime("5am-9am")}>5am-9am</label>

                  <input type="radio" id="timing2" name="timeslot" value="9am-12pm" />
                  <label htmlFor="timing2" onClick={() => setTime("9am-12pm")}>9am-12pm</label>

                  <input type="radio" id="timing3" name="timeslot" value="12pm-3pm" />
                  <label htmlFor="timing3" onClick={() => setTime("12pm-3pm")}>12pm-3pm</label>
                  <input type="radio" id="timing4" name="timeslot" value="3pm-6pm" />
                  <label htmlFor="timing4" onClick={() => setTime("3pm-6pm")}>3pm-6pm</label>

                  <input type="radio" id="timing5" name="timeslot" value="6pm-9pm" />
                  <label htmlFor="timing5" onClick={() => setTime("6pm-9pm")}>6pm-9pm</label>
                </div>
              </div>
              <br />
              <input type="submit" value="Submit" className="submitbutton" />
            </form>
          </div>
        </div>
      </div>
      <div className="matchedResults col-lg-8  mt-5">
        {nextpage ? <Results data={Data} /> : res ? <img src="src\assets\emptyresult.jpg" /> : null}
      </div>
    </div>
  )
}

export default OfferRideForm