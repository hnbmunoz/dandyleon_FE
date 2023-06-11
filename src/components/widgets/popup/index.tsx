import React from 'react'
import PopUpModal from '../../shared/modals/PopUpModal'
import { ClearButton } from '../../shared/buttons/CloseButton'
import { usePopUpInterface } from '../../store/popupStore/usePopUpInterface'

interface PopUpProps {
  closeWidget: () => void;
  // children: string | JSX.Element | JSX.Element[] | [];
}
const PopUp = ({ closeWidget}: PopUpProps) => {
  const { currentInterface} = usePopUpInterface();
  return (
    <PopUpModal>
      <div className="flex-column">
        <div className="" style={{position:"absolute", right: "0.6rem", top: "0.6rem"}}>
          <ClearButton buttonClick={closeWidget}/>
        </div>
        {currentInterface}
      </div>
    </PopUpModal>
  )
}

export default PopUp
