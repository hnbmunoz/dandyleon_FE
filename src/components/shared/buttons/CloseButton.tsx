import React from 'react'
import { MdOutlineClear } from "react-icons/md";

interface props {
  buttonClick: () => void
}

export const ClearButton = ({buttonClick} : props ) => {
  return (
    <div className="clear-container">
      <MdOutlineClear onClick={buttonClick} cursor="pointer"/>
    </div> 
  )
}
