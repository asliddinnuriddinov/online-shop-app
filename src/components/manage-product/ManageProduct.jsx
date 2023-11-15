import React, { useState } from 'react';
import "./ManageProduct.scss";
import { useSelector } from 'react-redux';
import {FiChevronRight, FiDisc, FiEdit3, FiEye, FiTrash2} from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

const ManageProduct = ({product}) => {
    const lang=useSelector(state=>state.lang.langCode)
    const [manageView,setManageView]=useState(false);
    const [productCategoryInd,setProductCategoryInd]=useState(0);
    const [productImgInd,setProductImgInd]=useState(0)
    console.log(product);
  return (
    <div className="manage__product-item">
        <img  width={180} src={product.productImages[0]} alt="" />
        <div className="main__info">
            <h4>{lang=="uz"?product.productName_uz:product.productName_ru}</h4>
            <strong>
                {
                    product.productSizesAndQuantity.length>1?
                    product.productSizesAndQuantity[0].price + " CУМ - " + product.productSizesAndQuantity.reverse()[0].price+" CУМ"
                    :
                    product.productSizesAndQuantity[0].price 
                }
            </strong>
            
            <small>Категория: <span>{lang=="uz"?product.productMainCategory_uz:product.productMainCategory_ru}</span> <FiChevronRight/>  <span>{lang=="uz"?product.productSubCategory_uz:product.productSubCategory_ru}</span> </small>
            </div>

                <div className="manage__actions">
                    <button className='manage__delete__btn'><FiTrash2/>Ўчириш</button>
                    <button className='manage__edit__btn'><FiEdit3/>Таҳрирлаш</button>
                    <button onClick={()=>{setManageView(true)}} className='manage__view__btn'><FiEye/>Кўриш</button>
                </div>


            <div style={manageView?{display:"grid"}:{display:"none"}} className="manage__pop-up">
               
                    <div className="manage__pop-up-wrapper">
                <button onClick={()=>setManageView(false)}>x</button>
                <div className="manage__left">
                    <img width={150} src={product?.productImages[productImgInd]} alt="" />
                    
                </div>
                <div className="manage__right">
                <h1>
                    {lang=="uz"?product?.productName_uz:product?.productName_ru}
                </h1>
                <div className="single__product-category">
                    <p>
                        {
                            lang=="uz"?product?.productMainCategory_uz:product?.productMainCategory_ru
                        }
                    </p>
                    <FiChevronRight/>
                    <p>
                        {
                            lang=="uz"?product?.productSubCategory_uz:product?.productSubCategory_ru

                        }
                    </p>
                </div>

                <div className="single__product-size-quantity">
                    <p>Омборда: <span>{product?.productSizesAndQuantity?.at(productCategoryInd).quantity}</span></p>

                    <div className="product__size">
                        <p>Ўлчам:</p>
                        <select onChange={e=>{setProductCategoryInd(e.target.value);}}>
                            {
                                product?.productSizesAndQuantity?.map((x,i)=>
                                        <option  key={i} value={i}>{x.size}</option>
                                    )
                            }
                        </select>
                    </div>
                </div>

                <div className="product__price">
                <strong>
                    {product?.productSizesAndQuantity?.at(productCategoryInd).price}  CУМ
                </strong>
                </div>


                <ul className="single__product-description">
                    {
                        product?.productDescription_uz?.map(x=>
                                <li key={uuidv4()}>* {x}</li>
                            )
                    }
                </ul>

                <div className="product__img__container">
                    {
                        product?.productImages?.map((x,ind)=>
                                <img style={ind==productImgInd?{border: "1px solid grey"}:{border: "1px solid transparent"}} key={uuidv4()} src={x} alt="" onClick={()=>setProductImgInd(ind)} />
                            )
                    }
        </div>
                </div>

                
                </div>
                
            </div>
            
    </div>
  )
}

export default ManageProduct