import React, { useState, useEffect, useRef } from "react";
import { useAdminNavigation } from "../../store/adminStore/useAdminNavigation";
import { useLoaderStore } from "../../store/loaderStore/useLoaderStore";

interface NavigationProps {
  children: string | JSX.Element | JSX.Element[] | [];
  panelIdx: number;
  isOpen: boolean;
}

// const AdminWidget = ({children = [], isOpen=false, panelIdx=0} : NavigationProps ) => {
const AdminWidget = () => {
  const { defaultPanel, changePanel } = useAdminNavigation();
  const { showLoading, hideLoading} = useLoaderStore();

  const [activeItem, setActiveItem] = useState<number>(0)

  useEffect(() => {        
    changePanel(activeItem)
    switchActivePanel()
    switchActiveItem()
    
  }, [activeItem]);

  const switchActivePanel = async() => {
    await showLoading()
    let targetEl = document.querySelectorAll(".section-item");
    await activeItem >= targetEl.length && setActiveItem(0)
    await targetEl.forEach((panel, idx) => {
      // activeItem > idx
      activeItem !== idx
        ? panel.classList.add("hide-panel")
        : panel.classList.remove("hide-panel");
    });
    await hideLoading()
  }
  
  const switchActiveItem = () => {
    let targetEl = document.querySelectorAll(".navigation-items");    
    activeItem >= targetEl.length && setActiveItem(0)
    targetEl.forEach((item, idx) => {
      activeItem == idx
        ? item.classList.add("active-items")
        : item.classList.remove("active-items");
    });
  }
  return (
    <div className="admin-navigation flex-column">
      <div className="navigation-items" onClick={() => {setActiveItem(0)}}>Transactions</div>
      <div className="navigation-items" onClick={() => {setActiveItem(1)}}>Category</div>
      <div className="navigation-items" onClick={() => {setActiveItem(2)}}>Products</div>
      {/* <div className="navigation-items" onClick={() => {setActiveItem(3)}}>Admin Accts</div> */}
      {/* <div className="navigation-items" onClick={() => {setActiveItem(4)}}>Reports</div>
      <div className="navigation-items" onClick={() => {setActiveItem(5)}}>Clients</div> */}
      {/* <ToggleButton>
      {<NavToggler toggleClick={isOpen}/> }
    </ToggleButton>  */}
      {/* {children} */}
    </div>
  );
};

export default AdminWidget;
