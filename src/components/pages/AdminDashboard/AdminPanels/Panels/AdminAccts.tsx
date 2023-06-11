import React, { useState, ChangeEvent } from "react";
import PasswordInput from "../../../../shared/inputs/password";
import TextInput from "../../../../shared/inputs/text";
import { ClearButton } from "../../../../shared/buttons/CloseButton";
import { useLoaderStore } from "../../../../store/loaderStore/useLoaderStore";
import axios from "axios";
import { toast } from "react-toastify";


interface SignUpProps {
  formSubmit: (
    fname: string,
    mname: string,
    lname: string,
    email: string,
    displayName: string,
    userName: string,
    password: string
  ) => void;
  toggleForm: () => void;
  closeWidget: () => void;
  isRegister: boolean
}

const AdminAccts = () => {
  const [fname, setFname] = useState<string>("");
  const [mname, setMname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, showLoading, hideLoading } = useLoaderStore();

  const handleRegistration = () => {
    // formSubmit(fname, mname, lname, email, displayName, userName, password);
  };


  const submitCreateAccount = async (
    // fname: string,
    // mname: string,
    // lname: string,
    // email: string,
    // displayName: string,
    // userName: string,
    // password: string
  ) => {
    showLoading();
    await axios({
      method: "post",
      url: "/signUp",
      headers: {},
      data: {
        fname: fname,
        mname: mname,
        lname: lname,
        email: email,
        display_name: displayName,
        username: userName,
        password: password,
        user_type: 1
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        // toggleForm()
      })
      .catch((ex: any) => {        
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };

  return (
    <div className="auth-form">
      <div className="auth-header">Create New User Account</div>
      {/* <div className="" style={{position:"absolute", right: "0.6rem", top: "0.6rem"}}>
        <ClearButton buttonClick={closeWidget}/>
      </div> */}
      <TextInput
        displayText={fname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          
          setFname(e.currentTarget.value);
        }}
        placeHolder="First Name"
        additionalClass="auth-input"
      />
      <TextInput
        displayText={mname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMname(e.currentTarget.value);
        }}
        placeHolder="Middle Initial/Name"
        additionalClass="auth-input"
      />
      <TextInput
        displayText={lname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setLname(e.currentTarget.value);
        }}
        placeHolder="Last Name"
        additionalClass="auth-input"
      />
      <TextInput
        displayText={displayName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setDisplayName(e.currentTarget.value);
        }}
        placeHolder="Display Name"
        additionalClass="auth-input"
      />
      <TextInput
        displayText={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.currentTarget.value);
        }}
        placeHolder="Email Address"
        additionalClass="auth-input"
      />
      <TextInput
        displayText={userName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUserName(e.currentTarget.value);
        }}
        placeHolder="User Name"
        additionalClass="auth-input"
      />
      <PasswordInput
        displayText={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.currentTarget.value);
        }}
        placeHolder="Password"
        additionalClass="auth-input"
      />
      <button className="auth-btn" onClick={submitCreateAccount}>
        Register as Administrator
      </button>
     
    </div>
  );
};

export default AdminAccts