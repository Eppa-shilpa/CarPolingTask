import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
//const loginUrl='https://localhost:44350/api/User/Login';
import axios from 'axios';
import "./Login.css";
type propType=
{
    userLogedIn:()=>void
}
const Login = ({userLogedIn}:propType) => {
  const [users,setUserList]=useState<string[]>([])
  const [emailWarning,setEmailWarning]=useState("")

  useEffect(() => {
  axios.get('https://localhost:44350/api/User/Users').then((response) => {
    response.data.map((object:any) => {
      setUserList((users) => [
        ...users,object.email
      ]);
    });
  });
  
  }, [])
  const nav=useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const  onSubmit = async (data: any) => {
    if(users.includes(data.email))
    {
      const response=await axios.get(`https://localhost:44350/api/User/Login/${data.email}`);
      if(response.status==200 && data.password==response.data.password)
      {
        const name=data.email.substring(0,data.email.lastIndexOf("@"));
        localStorage.setItem('userId',response.data.userId);
        localStorage.setItem('userName',name);
        const token=await axios.get(`https://localhost:44350/Jwt`,{ params: { name: name,email:data.email}})
        localStorage.setItem('bearerToken',token.data)
        userLogedIn();
        nav('/Menu')
      }
    }

else{
  setEmailWarning("email id is not registered");
}
  };
  return (
    <div className="Login" style={{overflow:"hidden"}}>
      <img src="src\assets\login.png" id="LoginImage" />
      <h2 id="loginText">Log in</h2>
      <hr id="line" style={{opacity:'20'}} />
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
            {errors.email && <p className="error">enter valid email</p>} <br />{emailWarning}
          </div>
          <div className="formField">
            <input
              className=" input"
              placeholder="&emsp;Enter Password"
              type="password"
              {...register("password", {
                required: true,
                //  pattern: /([a-zA-Z0-9\.-]+)@([a-z]+).([a-z]{2,10})/
              })}
            />
            {errors.password && <p className="error">Incorrect password</p>}
          </div>
          <input type="submit" value="Submit" id="submitButton" />
        </form>
        <p className="ms-5 mt-3">
          Not a member Yet?{" "}
          <a href="#" className="text-decoration-none link-light" onClick={()=>nav('/')}>
            <b>SIGN UP</b>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
