import React from 'react'

const Blur = () => {
  return (
    <div
      id="main-blur"
      style={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        backgroundColor: "#000",
        opacity: "0.8",        
        zIndex: "9",
        transition: "all 0.5s" 
      }}
    ></div>
  )
}

export default Blur