import React, { useState, ChangeEvent } from "react";

interface inputProps {
  displayText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  additionalClass: string;
}

const TextInput = ({displayText, onChange, placeHolder = "Type Here", additionalClass = ""} : inputProps) => {
  return (
    <div className= "default-input">
      <input
        name="username_email"
        placeholder={placeHolder}
        type="text"
        // className={additionalClass}
        onChange={onChange}
        value={displayText}
        style={{width: "100%"}}
        required
      />
    </div>
  );
};

export default TextInput;
