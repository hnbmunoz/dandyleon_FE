import React, { useState} from 'react'
import { useCartStore } from '../../store/cartStore/useCartStore';
import { useCartItems } from '../../store/cartStore/useCartItems';
import { useBlurStore } from '../../store/blurStore/useBlurStore';
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartButton = () => {
  const { myCart, showCart, hideCart} = useCartStore()
  const { cartItems }= useCartItems()
  const {  showBlur, hideBlur} = useBlurStore();
  const handleCartState = () => {    
    myCart ? closeCart() : openCart()    
  }

  const openCart = () => {
    showCart()
    showBlur()
  }

  const closeCart = () => {
    hideCart()
    hideBlur()
  }

  return (
    <div className='flex-row cart-button' onClick={handleCartState} data-cart_count={`${cartItems.length}`}>
      <AiOutlineShoppingCart fontSize="1.5rem" />
      {/* <label> Default Shipping</label> */}
    </div>
  )
}

export default CartButton