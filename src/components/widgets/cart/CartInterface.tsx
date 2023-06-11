import React, {useState, useEffect} from 'react'
import { useCartStore } from '../../store/cartStore/useCartStore'
import { useCartItems } from '../../store/cartStore/useCartItems';
import { ClearButton } from '../../shared/buttons/CloseButton';
import { useLoaderStore } from '../../store/loaderStore/useLoaderStore';
import { userProfileStore } from '../../store/profileStore/useProfileStore';
import { useBlurStore } from '../../store/blurStore/useBlurStore';
import { ToastContainer, toast } from "react-toastify";
import { BsFillTrashFill } from "react-icons/bs"
import axios from 'axios';
import _ from "lodash";

const CartInterface = () => {
  const { myCart, hideCart } = useCartStore();
  const { cartItems, overwriteCart, clearCart }= useCartItems()
  const { showLoading, hideLoading} = useLoaderStore();
  const { hideBlur } = useBlurStore();
  const { profile } = userProfileStore();
  const [netPrice, setNetPrice] = useState<number>(0)
  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(() => {
    setNetPrice(0)
      cartItems.forEach(product => {
        setNetPrice((prev) => Number(prev) + Number(product.net_price))
      })
  
    return () => {
      
    }
  }, [cartItems])

  
  const RecordTransaction  = async () => {
    if (profile.display === "" || _.isEmpty(profile)) return
    await showLoading();
    await axios({
      method: "post",
      url: "/api/v2/transactions/new",
      headers: {
        token: profile.token
      },
      data: {
        products: JSON.stringify(cartItems),
        net_price: netPrice,
      },
    })
      .then((res: any) => {
        toast.success(res.headers.msg ? res.headers.msg : "");
        hideLoading();
        clearCart();
              
      })
      .catch((ex: any) => {
        toast.error(ex.response.headers.msg ? ex.response.headers.msg : "");
        hideLoading();
      });
  };
  // rails db:migrate:down VERSION=20230529180632

  const closeCart = () => {
    hideCart()
    hideBlur()
  }

  const dropItem = (e : any) => {
    let targetIdx = e.currentTarget.dataset.cartindex
    let filteredCart = cartItems.filter(items => items.cartIdx != targetIdx)    
    overwriteCart(filteredCart)
  }

  return (
    <div className="cart-panel" style={{ width: `${myCart ? "20%" : "0"}`, fontSize: `${myCart ? "1rem" : "0 "}`}}>
      <div className='cart-header'>
        My Cart
        <div style={{padding: "0 0.5rem"}}>
          <ClearButton buttonClick={closeCart}/>
        </div>
      </div>
      <div className='cart-body flex-column'>
        {cartItems.map((item, idx) => {
          return (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  {item.product_name}
                </div>
                <div>
                  {item.qty}
                </div>
                <div>                
                  {dollarUSLocale.format(item.price)}
                </div>
                <div data-cartindex={item.cartIdx} style={{cursor: 'pointer'}} onClick={dropItem}>
                  <BsFillTrashFill />
                </div>
              </div>
            </div>
          )
        })}
        <div className='flex-row' style={{padding: "1rem"}}>
          <div style={{paddingRight: '0.5rem'}}>Total : </div>
          <div>{dollarUSLocale.format(netPrice)}</div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
          <button style={{fontSize: 'inherit', backgroundColor: 'olive'}} onClick={RecordTransaction}>
            Purchase
          </button>
          <button style={{fontSize: 'inherit', backgroundColor: 'pink'}} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
      {/* <ToastContainer position="bottom-left" /> */}
    </div>
  )
}

export default CartInterface