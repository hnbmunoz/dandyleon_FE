import React, { useState, useEffect } from "react";
import { useProductStore } from "../store/useProductStore/useProductStore";
import { useFilterStore } from "../store/filterStore/useFilterStore";
import { useOrderStore } from "../store/orderStore/userOrderStore";
import { useLoaderStore } from "../store/loaderStore/useLoaderStore";
import { useOrderView } from "../store/orderStore/useOrderView";
import Order from "./Order";
import axios from "axios";

interface OrderFormProps {
  orderFormState: () => void;
  // productID: number | string | null;
}
const ShowProducts = ({orderFormState} : OrderFormProps) => {
  const { productList } = useProductStore();
  const { setFilter } = useFilterStore(); 
  const { loading, showLoading, hideLoading } = useLoaderStore();
  let dollarUSLocale = Intl.NumberFormat("en-US");


  const goToOrder = (e: any) => {
    GetProductbyID(e.currentTarget.dataset.product_id)
    orderFormState()
  }
  const { ordered, loadOrder, clearOrder} = useOrderStore();

  const GetProductbyID = async(id :any) => {
    await showLoading()
    await axios({
      method: "get",
      url: `/api/v2/products/${id}`,
      headers: {},
      data: {},
    })
      .then(({data}: any) => {
        hideLoading();            
        loadOrder(data)      
      })
      .catch((ex: any) => {
        hideLoading();                
      });

    await hideLoading()
  }

  return (
    <div className="flex-row" style={{flexWrap: 'wrap'}}>     
    {productList
      .filter((allRecord) =>
        allRecord.name
          .toLowerCase()
          .includes(`${setFilter.toLowerCase().trim()}`)
      )
      .map((el) => {
        return <div className="product-items flex-column" data-product_id={el.id} onClick={goToOrder}>
          <img src={el.image_url}></img>
          <label>{el.name}</label>
          <label>{dollarUSLocale.format(el.price)}</label>
          </div>;
      })}
  </div>

  )
}

const Products = () => {  
  const { viewOrder, showOrder, hideOrder} = useOrderView()
  
  const { ordered, loadOrder, clearOrder} = useOrderStore();
  const handleOrderPage = () => {
    viewOrder ? hideOrder() : showOrder()
  }
  return (  
    <>
      {viewOrder ? 
        <Order 
          orderFormState={handleOrderPage}          
        /> : 
        <ShowProducts  orderFormState={handleOrderPage}/>}
    </>
  );
};

export default Products;
