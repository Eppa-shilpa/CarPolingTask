import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import StartPage from "./StartPage";
const SignUpPage = () => {
  return (
    <div className="row " style={{overflowX:'hidden',overflowY:'hidden'}}>
    <div className="col-12 col-sm-12 col-md-7 col-lg-8">
      <StartPage />
    </div>
    <div className="col-12 col-sm-12 col-md-5 col-lg-4 ">
      <SignUp />
    </div>
  </div>
  )
}

export default SignUpPage