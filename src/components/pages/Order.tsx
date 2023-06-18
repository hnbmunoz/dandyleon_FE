import React, { useState, useEffect, ChangeEvent} from 'react'
import { useOrderStore } from '../store/orderStore/userOrderStore';
import NumberInput from '../shared/inputs/number';
import { useCartItems } from '../store/cartStore/useCartItems';
import uuid from 'react-uuid';

interface OrderFormProps {
  orderFormState: () => void; 
}

interface ProductProps {
  cartIdx: string
  product_id: number | string | null
  product_name: string
  price: number
  qty: number | string
  net_price:number
}

interface CartProps {
  id: number
  products: ProductProps[]
  status: string
  transaction_date: string
  price: number

}

const Order = ({orderFormState} : OrderFormProps) => {  
  const { ordered } = useOrderStore();
  const { cartItems, overwriteCart } = useCartItems();
  const [quantity, setQuantity] = useState<string >("0")
  const [purchasePrice, setPurchasePrice] = useState<string>("0")

  const [myCart, setMyCart] = useState<ProductProps[]>([])
  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(() => {  
    setPurchasePrice((dollarUSLocale.format((Number(ordered.price) * Number(quantity)))) )
    return () => {    }
  }, [quantity])

  const handleAddtoCart = () => {
    if (Number(quantity) <= 0) return
    let newItem : ProductProps = {
      cartIdx: uuid(),
      product_id: ordered.prod_id,
      product_name: ordered.name,
      price: ordered.price,
      qty: quantity,
      net_price: Number(purchasePrice.replace(/[^\d\.]/g, ""))
    }        
    overwriteCart([...cartItems, newItem])
  }
  

  return (
    // <div className='order-page'>  
    <div className="order-page flex-row" style={{flexWrap: 'wrap', marginTop: '3.5rem'}}>  

      <div className="order-detail flex-row">
        <div className='flex-column'>
          <img src={ordered.image_url}></img>
        </div>
        <div className='flex-column' style={{width: "30rem"}}>
          <div className='order-header'>
            {ordered.name}
          </div>
          <div className=''>
            {dollarUSLocale.format( ordered.price)}           
          </div>
          <div className='order-description'>
            {ordered.description}
          </div>        
        </div>
        <div className="order-transaction">
           <div>
              <label>Quantity</label>
              <NumberInput
                displayValue={quantity.toString()}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.value.trim() === "") {
                    setQuantity("0");
                    return;
                  }
                  setQuantity(
                    e.currentTarget.value.replace(/[^\d\.]/g, "")
                  );
                }}
                onBlur={() => {
                  setQuantity(
                    dollarUSLocale.format(
                      Number(quantity.replace(/[^\d\.]/g, ""))
                    )
                  );
                }}
                incrementState={() => {
                  setQuantity(
                    dollarUSLocale.format(
                      Number(quantity.replace(/[^\d\.]/g, "")) + 1
                    )
                  );
                }}
                decrementState={() => {
                  setQuantity(
                    dollarUSLocale.format(
                      Number(quantity.replace(/[^\d\.]/g, "")) - 1
                    )
                  );
                }}
                placeHolder="Set Quantity"
              />
           </div>
           <div>
              <label>Price :</label>
              <label>{` ${purchasePrice}`}</label>
           </div>
           <div className="order-btn-container">            
            <button className="addToCart" onClick={handleAddtoCart}>
              <span className="addToCart_lg">
                  <span className="addToCart_sl"></span>
                  <span className="addToCart_text">Add to Cart</span>
              </span>
            </button>
           </div>
        </div>
      </div>         
    </div>
  )
}

export default Order