import React from 'react'
import {FiShoppingCart} from "react-icons/fi";
import "./Utils.scss"
import {toast} from "react-toastify";
import { useDispatch } from 'react-redux';

const DefaultButton = ({text,cartProductData}) => {
  const dispatch=useDispatch();
  return (
    <button onClick={()=>{toast.success("Added!");dispatch({addedCartProduct:cartProductData,type:"ADD_TO_CART"})}} className='defaultBtn'>
           <FiShoppingCart/> {text}
    </button>
  )
}

const Container=({children})=>{
  return(
    <div className='container'>
      {children}
    </div>
  )
}

export { DefaultButton,Container }