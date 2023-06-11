import React from 'react'

interface SectionProps {
  color: string
  children: string | JSX.Element | JSX.Element[] | [] | any;

}

const PanelSection = ({ children, color = "transparent" } : SectionProps) => {
  return (
    <div className="section-item" data-panel="panelsection" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default PanelSection