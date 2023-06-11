import React from "react";
import { ClearButton } from "../../buttons/CloseButton";
import { SearchButton } from "../../buttons/SearchButton";
import { useFilterStore } from "../../../store/filterStore/useFilterStore";

const StandardSearch = () => {  
  const {setFilter, updateFilter, clearFilter} = useFilterStore();

  return (
    <div className="search-container flex-row" style={{width: "200%"}}>
      {setFilter == "" && <SearchButton />}
      <input
        // className="default-input"
        style={{width: "100%"}}
        placeholder="Search..."
        value={setFilter}
        onChange={(e) => updateFilter(e.currentTarget.value)}
      ></input>
      {setFilter !== "" && <ClearButton buttonClick={clearFilter}/>}      
    </div>
  );
};

export default StandardSearch;
