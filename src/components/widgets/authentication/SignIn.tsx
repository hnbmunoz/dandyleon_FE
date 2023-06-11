import React, { useState, ChangeEvent } from "react";
import PasswordInput from "../../shared/inputs/password";
import TextInput from "../../shared/inputs/text";
import { ClearButton } from "../../shared/buttons/CloseButton";

interface SignInProps {
  formSubmit: (userName: string, password: string) => void;
  toggleForm: () => void;
  closeWidget: () => void;
  isRegister: boolean
}

const SignIn = ({ formSubmit, toggleForm, closeWidget, isRegister = false }: SignInProps) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (isRegister) return
    formSubmit(userName, password);
  };

  return (
    <div className="auth-form">      
      <div className="auth-header">Log In</div>
      <div className="" style={{position:"absolute", right: "0.6rem", top: "0.6rem"}}>
        <ClearButton buttonClick={closeWidget}/>
      </div>
      <TextInput
        displayText={userName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (isRegister) return
          setUsername(e.currentTarget.value);
        }}
        placeHolder="Username/Email"
        additionalClass="auth-input"
      />
      <PasswordInput
        displayText={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (isRegister) return
          setPassword(e.currentTarget.value);
        }}
        placeHolder="Password"
        additionalClass="auth-input"
      />
      <button className="auth-btn" onClick={handleLogin}>
        Log In
      </button>
      <div className="auth-toggle" >
        Don't have an account? <label className="toggle-link" style={{marginLeft: "0.5rem"}}onClick={toggleForm}>Sign Up</label>
      </div>
    </div>
  );
};

export default SignIn;
