import React, { useState, useEffect, MouseEvent } from "react";
import { useLoaderStore } from "../../../../store/loaderStore/useLoaderStore";
import { useFilterStore } from "../../../../store/filterStore/useFilterStore";
import { useBlurStore } from "../../../../store/blurStore/useBlurStore";
import { usePopUpStore } from "../../../../store/popupStore/usePopUpStore";
import { usePopUpInterface } from "../../../../store/popupStore/usePopUpInterface";
import { useProductStore } from "../../../../store/useProductStore/useProductStore";

import ProductPop from "../Pop/ProductPop";

// interface ProductProps {
//   id: number | null;
//   name: string;
//   description: string;
//   url: string;
// }

interface ProductProps {  
  id: number | null;
  name: string;
  description: string;
  category_id : number;
  price: number;
  discount: number;
  image_url: string;
}

const ProductPanel = () => {
  const { showLoading, hideLoading } = useLoaderStore();
  const { showPopUp } = usePopUpStore();
  const { overwriteInterface } = usePopUpInterface();
  const { showBlur } = useBlurStore();
  const { setFilter } = useFilterStore();
  const { productList } = useProductStore();

  const [products, setProcducts] = useState<ProductProps[]>([
    { id: 0, name: "", description: "", category_id: 0, price: 0, discount: 0, image_url: "" },
  ]);
  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(() => {
    DisplayProducts();
    return () => {};
  }, [productList]);

  const DisplayProducts = async() => {
    await showLoading();
    await setProcducts([...products,...productList])
    await hideLoading();
  }

  const openProductsPop = async (e : MouseEvent<HTMLButtonElement>) => {    
    await overwriteInterface(<ProductPop id={Number(e.currentTarget.dataset.category_id)} />);
    await showBlur();
    await showPopUp();
  }
  return (
    <div className="config-panel">
      <div className="config-header"> List of Products </div>
      <div className="config-body">
        <div className="config-table">
          <div className="table-header">
            <div className="header-elements col-width1"></div>
            <div className="header-elements col-width1">Name</div>
            <div className="header-elements col-width2">Description</div>            
            <div className="header-elements col-width1">Price</div>
            <div className="header-elements col-width3">Options</div>
            
          </div>
          <div className="table-body">
            {productList
              .filter((allRecord) =>
                allRecord.name
                  .toLowerCase()
                  .includes(`${setFilter.toLowerCase().trim()}`)
              )
              .map((el) => {
                return (
                  <div className="table-row" >
                     <img className="table-elements col-width1"src={el.image_url}></img>
                    <div className="table-elements col-width1">{el.name}</div>
                    <div className="table-elements col-width2">
                      {el.description}
                    </div>                
                    <div className="table-elements col-width1">               
                      {dollarUSLocale.format(el.price)}
                    </div>
                    <div className="table-elements col-width3" >                     
                      <button className="table-btn-details" data-category_id={el.id} onClick={openProductsPop}>
                         Details
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="table-footer" data-category_name="">
              <button className="new-btn" onClick={openProductsPop}>
                Add new Record
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPanel