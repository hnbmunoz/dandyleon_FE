import React from 'react'

interface Props  {
  children: string | JSX.Element | JSX.Element[] | []
}

const PopUpModal = ({children} : Props) => {
  return (
    <div className='pop-up-modal'>
      {children}
    </div>
  )
}

export default PopUpModal