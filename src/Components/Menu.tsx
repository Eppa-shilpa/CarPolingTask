import React from 'react'
import './Menu.css'
import {useNavigate} from 'react-router-dom'
import Header from './Header'
const Menu = () => {
  const nav=useNavigate()
  const name=localStorage.getItem("userName")
  return (
    <div className='container-fluid menuDiv' >
       <Header/>
             <div className='body'>
                 <h2 className='mt-5 mb-5 welcomeText'> Hey {name} !</h2>
                 <div className='row row2'>
                  <div className="col-lg-3">  
                  </div>
                 <div className=' col-lg-3 '>
                  <div className="BookRide text-center" onClick={()=>nav('/BookRide')}>
                  <h2>Book a Ride</h2>
                  </div>
                    
                 </div>
                 <div className=' col-lg-3 '>
                  <div className="OfferRide text-center "onClick={()=>nav('/OfferRide')}>
                  <h2>Offer a Ride</h2>
                  </div>
             
                 </div>
                 <div className="col-lg-3"></div>
                 </div>                
             </div>
                <img src="src\assets\img3.png" id="bookOfferRideImage" />
    </div>
    
  )
}

export default Menu