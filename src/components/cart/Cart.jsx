import React, { memo, useState } from 'react';
import "./Cart.scss";
import { useDispatch } from 'react-redux';
import { FiShoppingCart,FiChevronRight,FiTrash2 } from "react-icons/fi"
import { FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
const Cart = () => {
    const [cartOpen,setCartOpen]=useState(false);
    const cartState=useSelector(state=>state.cartState.cartState);
    const dispatch=useDispatch();
    const productData=useSelector(state=>state?.cartProducts.cartProducts);
    const exeptionalRoutes=["/admin","/admin/create","/admin/orders/all","/admin/orders/called","/admin/orders/uncalled",'/login','/admin/manage']
    const {pathname}=useLocation()
    let sum=0;
    productData?.map(x=>sum+=x.count*x.productSizesAndQuantity[0].price)
    let totalCount=0;
    productData?.map(x=>totalCount+=x.count);
    const [userName,setUserName]=useState('');
    const [userNumber,setUserNumber]=useState('');

    function makeOrder(e){
      e.preventDefault()
      if(productData){
        const date=new Date();
        const day=date.getDate()
        const month=date.getMonth()+1
        const year=date.getFullYear()
        const hour=date.getHours()
        const minute=date.getMinutes()
        const orderTime=`${day}-${month}-${year}/${hour}:${minute}`
        const {...orderData}=productData;
        orderData.userName=userName
        orderData.userNumber=userNumber
        orderData.orderTime=orderTime
        orderData.orderCount=totalCount
        orderData.orderPrice=sum
        dispatch({payload:orderData,type:"MAKE_ORDER"})
      }
    }


  return !exeptionalRoutes.includes(pathname)? (
            <div style={cartState?{transform:"translateX(0px)"}:{transform:'translateX(450px)',boxShadow:"none"}} className='cart'>
              
              
            <div  className="cart__wrapper">
              
            <div style={cartState?{display:"none"}:{display:"flex"}} onClick={()=>{setCartOpen(true);dispatch({type:"CHANGE_CART_STATE",changedCartState:true});document.body.style.overflow="hidden"}} className="cart__btn__wrapper">
            <button  className='cart__btn'><FiShoppingCart/><p>{totalCount}</p></button>
            <strong className='cart__total__price'>{sum} CУМ</strong>
            </div>
            <button style={cartState?{display:"block"}:{display:"none"}}onClick={e=>{setCartOpen(false);dispatch({type:"CHANGE_CART_STATE",changedCartState:false});document.body.style.overflow="auto"}} className='close__cart__btn'><FaTimes/></button>
              {
                productData.length>0?
                <>
 
            <div className="head__cart">
            <h1>Сават</h1>
            <button onClick={e=>dispatch({type:"DELET_ALL_CART"})} className='cart__deleteAll__btn'>Барчасини ўчириш</button>
            </div>

            <div className="cart__products">
              {
                productData?.map((x,i)=>
                    <div key={uuidv4()} className="cart__product__item">
                      <button onClick={e=>dispatch({singleProduct:x._id,type:"DELET_PRODUCT_CART"})} className='delete__cart__product'><FiTrash2/></button>
                      <div className="cart__product__img">
                        <img src={x.productImages[0]} alt="" />
                      </div>
                      <div className="cart__product__title">
                        <h4>{x.productName_uz}</h4>
                        <FiChevronRight/>
                        <span>{x.productSizesAndQuantity[0].size}</span>
                      </div>
                      <strong>
                        {x.productSizesAndQuantity[0].price} CУМ
                      </strong>

                      <div className="cart__product__count-wrapper">
                        <h5>Cони:</h5>
                          <div className="cart__product__count">
                            <button onClick={e=>dispatch({payload:i,type:"MINUS_COUNT"})}>-</button>
                            <span>{productData[i].count}</span>
                            <button onClick={e=>dispatch({payload:i,type:"PLUS_COUNT"})}>+</button>
                            {/* productData[i].count<productData[i].productSizesAndQuantity?.at(0).quantity ?productData[i].count=productData[i].count+1:null */}
                          </div>
                      </div>

                    </div>
                  )
              }
            </div>

            <div className="cart__order">
                <b>Cони: {totalCount}</b>
                <br />
                <strong>{sum} CУМ</strong>
                <div className="cart__form">
                <form onSubmit={e=>makeOrder(e)}>
                    <input value={userName} onChange={(e)=>setUserName(e.target.value)} required type="text" placeholder='Исмингиз ва Фамилиянгиз' />
                    <br />
                    <input value={userNumber} onChange={(e)=>setUserNumber(e.target.value)} required type="text" placeholder='Телефон (991234567)' />
                    <br />
                    <button type='submit'>Буюртма бериш</button>
                </form>
                </div>
            </div>
            </>
            :
            <>
              <h2 className='empty__cart__head'>Сават</h2>
              <div className='cart__empty'>
              <h3>Сават бўш</h3>
              <img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/box.8b1373dd433f40a487ec.png" alt="" />
              <button onClick={e=>{setCartOpen(false);dispatch({changedCartState:false,type:'CHANGE_CART_STATE'})}}> Харид қилиш</button>
              </div>
            </>
              }
            </div>
    </div>
  )
  :
  <></>
}

export default memo(Cart)