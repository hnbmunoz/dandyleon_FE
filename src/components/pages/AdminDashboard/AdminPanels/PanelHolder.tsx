import React, { useEffect } from "react";

interface PanelProps  {
  children: string | JSX.Element | JSX.Element[] | []
  panelIdx: number
}

const PanelHolder = ({ children = [], panelIdx = 0 } : PanelProps) => { 

  return (
    <div className="section-container">
      {children}    
    </div>
  );
};

export default PanelHolder