import React from "react";
import Logo from "../shared/logo/Logo";
import Navigation from "../navigation/Navigation";
import StandardSearch from "../shared/inputs/search/StandardSearch";

const Header = () => {
  return (
    <div className="header-container">
      <div style={{ display: 'flex', width: "100%", backgroundColor: "red", position: 'relative', justifyContent:'center' }}>
        <div className="header-logo">
          <Logo />
        </div>
        <div>
          <StandardSearch />
        </div>
        <div className="">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Header;
