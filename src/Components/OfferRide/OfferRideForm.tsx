import React, { useEffect, useState } from 'react'
import "./OfferRideForm.css";
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { VscCircleFilled } from "react-icons/Vsc";
import { MdLocationOn } from "react-icons/Md";
import OfferRideStops from "./OfferRideStops";
import axios from 'axios';
const OfferRideForm = () => {
  const nav = useNavigate()
  const style = { color: "rgb(100, 51, 146)", fontSize: "1.8em" };
  const dot = { color: "rgb(171, 173, 175)", fontSize: "1.2em" };
  const [nextpage, setNextPage] = useState(false);
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [formdata, setFormData] = useState<any>({});
  const [date, setDate] = useState<any>("")
  const [time, setTime] = useState<string>("")
  const [bg, setBg] = useState("white")
  const [Locations, setlocations] = useState<{ locationId: number, locationName: string, disabled: boolean }[]>([{ locationId: 0, locationName: "choose location", disabled: true }])
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
    setNextPage(true)
    e.preventDefault();
    const sourceId: number = Number(source)
    const destinationId: number = Number(destination)
    const data: any = { "source": sourceId, "destination": destinationId, "date": date, "time": time }
    setFormData(data)

  }
  return (
    <div className="row ride">
      <div className='BookRideForm col-lg-4'>
        <div className="m-5">
          <div className="OfferRideForm">
            <div className="header">
              <h2>Offer a Ride</h2>
              <p className="tagLine">we get you the matches asap !</p>
            </div>
            <form onSubmit={onSubmit} aria-required>
              <div className="form-check form-switch switch">
                <input className="form-check-input switchWidth" type="checkbox" id="flexSwitchCheckChecked " onChange={() => nav("/BookRide")} />
              </div>
              <div className="formLabel">
                <label id="label" className="labelName" htmlFor='source'>From</label>
                <span id="icon1"> <VscCircleFilled style={style} /></span>   <br />
                <select name="source" className='location' onChange={e => setSource(e.target.value)} required >
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

                <label className="labelName">Time</label> <br />
                <div className="radio-toolbar">

                  <input type="radio" id="timing1" name="timeslot" value="5am-9am" required />
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
              <input type="submit" value="Next>>" className="next" />
            </form>
          </div>
        </div>
      </div>
      <div className="matchedResults col-lg-4  mt-5">
        {nextpage ? <OfferRideStops data={formdata} /> : null}
      </div>
    </div>
  )
}

export default OfferRideForm