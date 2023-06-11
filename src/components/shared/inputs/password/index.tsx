import React, {useState, ChangeEvent} from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface inputProps {
  displayText: string;
  onChange:(e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  additionalClass: string;
}

const PasswordInput = ({displayText, onChange, placeHolder = "Password", additionalClass = ""} : inputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className= {`flex-row ${additionalClass}`}>
      <input
        name="password"
        placeholder={placeHolder}
        type={showPassword ? "text" : "password"}        
        minLength={6}
        onChange={onChange}
        value={displayText}
        style={{width: "90%"}}
        required
      />
      <button
        className="eye-button"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {!showPassword ? (
          <AiFillEyeInvisible color="808080" />
        ) : (
          <AiFillEye color="dc143c" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
