import React, { } from 'react'

interface Props  {
  children: string | JSX.Element | JSX.Element[] | []
}

const MainModals = ({children} : Props) => {
  return (
    <div className='transparent-modal'>
      {children}
    </div>
  )
}

export default MainModals