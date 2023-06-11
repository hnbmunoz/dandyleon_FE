import React, { useState, MouseEvent} from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface DropDownProps {
  dataStore: SelectedProps[]
  onDropSelect: (valID : number, valValue :string) => void
  placeholder: string
  // DefaultSelection: {id: string, value: string}
}

interface SelectedProps {
  id: number | null
  value: string 
}

const DropDown = ({ dataStore = [], onDropSelect, placeholder = ""} : DropDownProps) => {
  const [selectedData, setSelectedData] = useState<SelectedProps>({id: null, value: ""});
  const [showDrop, setShowDrop] = useState(false);  
  
  const hideDrop = () => {
    setShowDrop(false);
  };

  const displayDrop = () => {
    setShowDrop(true);
  };

  const onChangeInput = (e : any) => {
    return false
  };

  const onSelected = (e : MouseEvent<HTMLDivElement>) => {   
    let selectedObj = {id: Number(e.currentTarget.dataset.dropdown_id), value: e.currentTarget.innerHTML }        
    setSelectedData(selectedObj)
    onDropSelect(Number(e.currentTarget.dataset.dropdown_id), e.currentTarget.innerHTML)    
    setShowDrop(false);
  }

  return (
    <div className="drop-down-container">
      <div className="drop-down-input-container">
        <input         
          className="drop-down-input-container__textbox"
          placeholder={placeholder}
          value={selectedData.value}
          onChange={onChangeInput}
          onKeyDown={onChangeInput}
          autoComplete="off"
          autoCorrect="off"
        ></input>
        <div className="placeholder-icons-container">
          {showDrop ? (
            <button className="placeholder-button" onClick={hideDrop}>
              <IoIosArrowUp />
            </button>
          ) : (
            <button className="placeholder-button" onClick={displayDrop}>
              <IoIosArrowDown />
            </button>
          )}
        </div>
      </div>
      {/* .filter(removeDisable => !removeDisable.title.toLowerCase().includes("--disabled--")) */}
      {showDrop && (
          <div className="drop-down-item-container">
            {dataStore
              .map((obj, idx) => (
                <div className="drop-down-item" key={idx}>
                  <div
                    style={{ padding: "0 1rem" }}
                    onClick={onSelected}
                    data-dropdown_id={obj.id}
                  >
                    {obj.value}
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
  )
}

export default DropDown