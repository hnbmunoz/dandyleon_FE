import React, { useState, useEffect, ReactNode, DOMAttributes } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderStore } from "../store/loaderStore/useLoaderStore";
import { useCategoryStore } from "../store/useCategoryStore/useCategoryStore";
import { useProductStore } from "../store/useProductStore/useProductStore";
import { useOrderView } from "../store/orderStore/useOrderView";
import DropDown from "../shared/inputs/dropdown";
import { GiEmeraldNecklace, GiCrystalEarrings, GiPoloShirt, GiWatch} from "react-icons/gi"
import { IoHomeOutline } from "react-icons/io5"


interface CategoryProps {
  id: number | null;
  name: string;
  description: string;
  url: string;
}

interface DropdownProps {
  id: number | any;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([
    { id: null, name: "All", description: "All Products", url: "" },
  ]);
  const { showLoading, hideLoading } = useLoaderStore();
  const { categoryList, loadCategory } = useCategoryStore();
  const { productList, loadProduct } = useProductStore();
  const { viewOrder, showOrder, hideOrder} = useOrderView()
  const [activeItem, setActiveItem] = useState<number>(0)

  const [selectedCategory, setSelectedCategory] = useState<DropdownProps>({
    id: 0,
    name: "",
  });

  useEffect(() => {
    LoadAllCategories();
    return () => {};
  }, []);

  const LoadAllCategories = async () => {
    await showLoading();
    await setCategories([...categories, ...categoryList]);
    hideLoading();
  };

  const handleDropSelect = (categoryID: number, categoryName: string) => {
    ProductsByCategory(categoryID)
  };

  const handleTabSelect = async(e : any) => {    
    ProductsByCategory(e.currentTarget.dataset.category_id)
    let activeEl = e.currentTarget
    
    let targetEl = document.querySelectorAll(".category-items");    
    await targetEl.forEach((panel, idx) => {     
      panel.classList.remove("active-category-tab");
    });

    await activeEl.parentElement.classList.add("active-category-tab")
  }


  const ProductsByCategory = async(categoryID: number | string ) => {    
    if (categoryID === "0") return
    hideOrder();
    await showLoading()
    await axios({
      method: "get",
      url: `/api/v2/products/category/${categoryID}`,
      headers: {},
      data: {},
    })
      .then(({data}: any) => {        
        hideLoading();      
        loadProduct(data.data)      
      })
      .catch((ex: any) => {
        hideLoading();        
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
      });

    await hideLoading()
  }

  return (
    <div className="categories-container">
       <CategoryTabs tabID="All" tabName="All Products" activeTab="active-category-tab" tabClick={handleTabSelect}>
         <IoHomeOutline />
      </CategoryTabs>
      <CategoryTabs tabID={2} tabName="Necklace" activeTab="" tabClick={handleTabSelect} >
         <GiEmeraldNecklace />
      </CategoryTabs>
      <CategoryTabs tabID={1} tabName="Earrings" activeTab="" tabClick={handleTabSelect}>
         <GiCrystalEarrings />
      </CategoryTabs>
      <CategoryTabs tabID={3} tabName="Clothes" activeTab="" tabClick={handleTabSelect}>
         <GiPoloShirt />
      </CategoryTabs>
      <CategoryTabs tabID={4} tabName="Clothes" activeTab="" tabClick={handleTabSelect}>
         <GiWatch />
      </CategoryTabs>
      <CategoryTabs tabID={0} tabName="" activeTab="" tabClick={handleTabSelect}>
        <DropDown
          dataStore={categoryList.map((item) => ({
            id: item.id,
            value: item.name,
          }))}
          onDropSelect={handleDropSelect}
          placeholder="All Categories"
        />
      </CategoryTabs>
    </div>
  );
};

export default Categories;

interface TabProps {
  tabID: number | string;
  tabName: string;
  activeTab: string
  tabClick: (el : any) => void;
  children: string | JSX.Element | JSX.Element[] | ReactNode | []  | null ;
}


const CategoryTabs = ({tabID = 0, tabName = "", activeTab = "", tabClick, children = null} : TabProps) => {
  return (
    <div className={`${tabID === 0 ? "category-all" : "category-items"}  ${activeTab}`}>
      <div className="flex-column" style={{alignItems: "center", fontSize: "2rem"}} data-category_id = {tabID} onClick ={tabClick}>        
        {children}
        { !(tabName === "") && <div style = {{fontSize: "1rem"}}>
          {tabName}
        </div>}
      </div>
    </div>
  )
}