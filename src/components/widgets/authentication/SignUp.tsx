import React, { useState, ChangeEvent } from "react";
import PasswordInput from "../../shared/inputs/password";
import TextInput from "../../shared/inputs/text";
import { ClearButton } from "../../shared/buttons/CloseButton";

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

const SignUp = ({ formSubmit, toggleForm, closeWidget, isRegister = true}: SignUpProps) => {
  const [fname, setFname] = useState<string>("");
  const [mname, setMname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegistration = () => {
    formSubmit(fname, mname, lname, email, displayName, userName, password);
  };

  return (
    <div className="auth-form">
      <div className="auth-header">Create New User Account</div>
      <div className="" style={{position:"absolute", right: "0.6rem", top: "0.6rem"}}>
        <ClearButton buttonClick={closeWidget}/>
      </div>
      <TextInput
        displayText={fname}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!isRegister) return
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
      <button className="auth-btn" onClick={handleRegistration}>
        Register
      </button>
      <div className="auth-toggle" onClick={toggleForm}>        
        Already have an account? <label className="toggle-link" style={{marginLeft: "0.5rem"}}onClick={toggleForm}>Sign In</label>
      </div>
    </div>
  );
};

export default SignUp;
