import React, { useState, ChangeEvent, MouseEvent} from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface NumberInputProps {
  placeHolder: string
  displayValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  incrementState: () => void
  decrementState: () => void
  
}

const NumberInput = ({displayValue, onChange, onBlur, incrementState, decrementState, placeHolder = "Type Here"}: NumberInputProps) => {


  return (
    <div className="numbers-container">
    <div className="numbers-input-container">
      <input         
        className="numbers-input-container__textbox"
        placeholder={placeHolder}
        value={displayValue}
        onChange={onChange}
        // onKeyDown={onChangeInput}
        autoComplete="off"
        autoCorrect="off"
        onBlur={onBlur}              
      ></input>
      <div className="placeholder-icons-container">
      <button className="placeholder-button" onClick={incrementState}>
        <IoIosArrowUp />
      </button>
      <button className="placeholder-button" onClick={decrementState}>
        <IoIosArrowDown />
      </button>
      </div>
    </div>
    </div>
  )
}

export default NumberInput