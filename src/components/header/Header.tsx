import React from 'react'
import Logo from '../shared/logo/Logo'
import Navigation from '../navigation/Navigation'
import StandardSearch from '../shared/inputs/search/StandardSearch'

const Header = () => {  
  return (
    <div className="header-container">
      <div className='header-logo'>
        <Logo />
      </div>
      <div>
        <StandardSearch />
      </div>
      <div className=''>
        <Navigation />
      </div>
    </div>
  )
}

export default Header