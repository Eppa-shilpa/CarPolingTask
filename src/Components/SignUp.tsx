import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./SignUp.css";
const url = 'https://localhost:44350/api/User/Register';
const SignUp = () => {
  const [users,setUserList]=useState<string[]>([])
  const [emailWarning,setEmailWarning]=useState("")
  const [passwordWarning,setpasswordWarning]=useState("")
  useEffect(() => {
  axios.get('https://localhost:44350/api/User/Users').then((response) => {
    response.data.map((object:any) => {
      setUserList((users) => [
        ...users,object.email
      ]);
    });
  });
  
  }, [])
  
  const nav = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    if(users.includes(data.email)){
setEmailWarning("user already exists")
    }
    else if (data.password != data.confirmpassword) {
      // alert("password doesnt match");
      setpasswordWarning("password doesnt match")
      //reset();
    } else {
      const response = await axios.post(url, { email: data.email, password: data.password })
      console.log(response);
      nav('/login')
    }
console.log(users)
  };
  return (
    <div className="SignUp" style={{ overflow: "hidden" }}>
      <img src="src\assets\imgg2.png" id="signUpImage" />
      <hr id="line1" style={{ opacity: '20' }} />
      <div className="register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formField">
            <input
              className=" input"
              placeholder="&emsp; Enter Email id"
              type="email"
              {...register("email", {
                required: true,
                pattern: /([a-zA-Z0-9\.-]+)@([a-z]+).([a-z]{2,10})/,
              })}
            />
            {errors.email && <p className="error">enter valid email</p>} <br />
            {emailWarning}
          </div>
          <div className="formField">
            <input
              className=" input"
              placeholder="&emsp;Enter Password"
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
              })}
            />
            {errors.password && <p className="error">Invalid password</p>} <br />
            {passwordWarning}
          </div>
          <div className="formField">
            <input
              className=" input"
              placeholder="&emsp;Confirm  Password"
              type="password"
              {...register("confirmpassword", {
                required: true,
                pattern: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
              })}
            />
            {errors.confirmpassword && (
              <p className="error">Invalid password</p>
            )} <br />
            {passwordWarning}
          </div>
          <input type="submit" value="Submit" id="submitButton" />
        </form>
        <p className="ms-5 mt-3">
          Already a member?{" "}
          <a href="#" className="text-decoration-none link-light" onClick={() => nav('/login')}>
            <b>LOG IN</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
