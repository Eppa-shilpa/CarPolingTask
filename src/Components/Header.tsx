import React from "react";
import "./Header.css";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const nav = useNavigate()
  const id=0;
  const name=localStorage.getItem("userName")
  return (
    <div className="row">
      <div className="col-lg-10">
        <img src="src\assets\logo (1).png" className="ps-5 pt-5" onClick={()=>{nav(-1)}}/>
      </div>
      <div className="col-lg-2 pt-5 m-0">
        <span id="userName">{name}</span> &emsp;
        <span className="Dropdown">
          <MDBDropdown>
            <MDBDropdownToggle tag='a' className='btn btn-light'>
              <img src="src\assets\userIcon.jpeg" id="profilePic" />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem link className="MenuItems" onClick={() => {nav('/Menu')}}>Profile</MDBDropdownItem>
              <MDBDropdownItem link className="MenuItems"  onClick={() => nav('/MyRides')}>My Rides</MDBDropdownItem>
              <MDBDropdownItem link className="MenuItems"  onClick={()=>{localStorage.removeItem("userId") ,localStorage.removeItem('bearerToken'),localStorage.removeItem("userName"),nav('/login')}}>Log Out</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </span>

      </div>
    </div>
  );
};

export default Header;
