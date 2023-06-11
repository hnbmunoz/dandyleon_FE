import React, { useState, ChangeEvent } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import Toast from "../notification/Toast";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const notify = () => toast("Wow so easy!");
  

  
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {      
    setUsername(e.currentTarget.value);
  };


  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {    
    setPassword(e.currentTarget.value); 
  };

  const submitVerifyUser = async () => {
    await axios({
      method: 'post',
      url: '/authentications/signIn',
      headers: {}, 
      data: {
        username_email: userName,
        password: password, 
      }
    }).then((res: any) => {      
      // setAlertMessage(res.headers.msg ? res.headers.msg : "")
      location.reload();
  
    }).catch((ex: any) => {
      setAlertMessage(ex.headers.msg ? ex.headers.msg : "")      
    });

  }
  

  return (
    <>
      {/* <form action="/authentications/signIn" className="auth-form" method="post"> */}
      <div className="auth-form">
        <div>Log In</div>
        <input
          name="username_email"
          placeholder="Username/Email"
          type="text"
          className="auth-input"
          onChange={handleUserName}
          value={userName}          
          required
        />
        <div>
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="auth-input"
            minLength={6}
            onChange={handlePassword}
            value={password}
            
            required
          />
          <button className="eye-button" onClick={() => { setShowPassword(!showPassword) }}>
            {!showPassword ? (
              <AiFillEyeInvisible color="808080" />
            ) : (
              <AiFillEye color="dc143c" />
            )}
          </button>
        </div>
        <button className="auth-btn" onClick={notify}>Log In</button>
        <ToastContainer
          draggable          
        />
      </div>
      {/* </form> */}
      {/* <Toast toastMsg={alertMessage}/> */}
    </>
  );
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const eyeClick = (e: any) => {
    setShowPassword(!showPassword);   
    e.preventDefault();
  };

  const eyeConfirmClick = (e: any) => {
    setShowConfirmPassword(!showConfirmPassword);
    e.preventDefault();
  };


  return (
    <>
  
      <div className="auth-form"  > 
        <div>Create New User Account</div>      
        <input name="first_name" placeholder="First Name" type="text" className="auth-input" required/>      
        <input name="last_name" placeholder="LastName" type="text" className="auth-input"/>    
        <input name="username" placeholder="Username" type="text" className="auth-input" required/>
        <input name="email" placeholder="Email" type="email" className="auth-input" required/>
        <div>
          <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} className="auth-input"  minLength={6} required/>
          <button className="eye-button" onClick={eyeClick}>
            {!showPassword ? (
              <AiFillEyeInvisible color="808080" />
            ) : (
              <AiFillEye color="dc143c" />
            )}
          </button>
        </div>     
        <div></div>
        <button className="auth-btn" >Register</button>
      </div>
    </>
  );
};

const Authentication = () => {
  const [register, setRegister] = useState(false);
  const handleButton = () => {
    setRegister(!register);   
  };
  return (
   <div>
      <div className="authentication-modal">
        {register ? <SignUp /> : <SignIn />}       
      </div>
      <button className="auth-state" onClick={handleButton}>{register ? "Already have an account? Sign In" :"New User? Sign Up"} </button>
    </div>
  );
};

export default Authentication;
