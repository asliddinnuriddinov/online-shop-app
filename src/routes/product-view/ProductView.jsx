import React, { useEffect, useState } from 'react';
import "./ProductView.scss"
import { useParams } from 'react-router-dom'
import { instance } from '../../api/axios';
import { v4 as uuidv4 } from 'uuid';
import { FiChevronRight, FiDisc, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { Container } from '../../utils/Utils';

const ProductView = () => {
    let productID=useParams().id;
    const [singleProduct,setSingleProduct]=useState([]);
    let productInfo=singleProduct?.singleProduct?.at(0);
    const [counter,setCounter]=useState(1);
    const [activeImageInd,setActiveImageInd]=useState(0);
    const [productCategoryInd,setProductCategoryInd]=useState(0);
    const dispatch=useDispatch()
    
    
    useEffect(()=>{
        instance(`/product/single-product/${productID}`)
        .then(responce=>setSingleProduct(responce.data))
        .catch(err=>console.error(err));
    },[productID]);
    
    function addTocart(productData){
        const {productSizesAndQuantity,...newProductData}=productData;
        newProductData.productSizesAndQuantity=[productSizesAndQuantity?.at(productCategoryInd)];
        newProductData.count=counter;
        dispatch({addedCartProduct:newProductData,type:"ADD_TO_CART"})
    }

  return (
    <Container>
    <div className='single__product'>
        <div className="single__product__wrapper">
            <div className="single__left">
                <img src={productInfo?.productImages?.at(activeImageInd)} alt="" />    

            </div>   

            <div className="single__right">
                <h1>
                    {productInfo?.productName_uz}
                </h1>
                <div className="single__product-category">
                    <p>
                        {
                            productInfo?.productMainCategory_uz
                        }
                    </p>
                    <FiChevronRight/>
                    <p>
                        {
                            productInfo?.productSubCategory_uz

                        }
                    </p>
                </div>

                <div className="single__product-size-quantity">
                    <p>Омборда: <span>{productInfo?.productSizesAndQuantity?.at(productCategoryInd).quantity}</span></p>

                    <div className="product__size">
                        <p>Ўлчам:</p>
                        <select onChange={e=>{setProductCategoryInd(e.target.value);setCounter(1)}}>
                            {
                                productInfo?.productSizesAndQuantity?.map((x,i)=>
                                        <option  key={i} value={i}>{x.size}</option>
                                    )
                            }
                        </select>
                    </div>
                </div>

                <div className="product__price">
                <strong>
                    {productInfo?.productSizesAndQuantity?.at(productCategoryInd).price}  CУМ
                </strong>
                </div>

                <ul className="single__product-description">
                    {
                        productInfo?.productDescription_uz?.map(x=>
                                <li key={uuidv4()}><FiDisc/>{x}</li>
                            )
                    }
                </ul>

                <div className="single__product-total-price">
                    <div className="quantity">
                        <p>Cони:</p>
                        <div className="counter">
                                <button onClick={()=>counter>1?setCounter(counter-1):''}><FiMinus/></button>
                                <b>{counter}</b>
                                <button onClick={()=>productInfo.productSizesAndQuantity[productCategoryInd].quantity>counter?setCounter(counter+1):null}><FiPlus/></button>                                
                        </div>
                    </div>
                    <div className="total__price">
                        <p>Умумий нархи:</p>
                        <b>{productInfo?.productSizesAndQuantity?.at(productCategoryInd).price*counter}  CУМ</b>
                    </div>

                    <button onClick={()=>addTocart(productInfo)}>
                        <FiShoppingCart/>
                        Саватга қўшиш
                    </button>
                </div>
            </div> 
        </div>        

        <div className="product__img__container">
                    {
                        productInfo?.productImages?.map((x,ind)=>
                                <img style={ind==activeImageInd?{border: "1px solid grey"}:{border: "1px solid transparent"}} key={uuidv4()} src={x} alt="" onClick={()=>setActiveImageInd(ind)} />
                            )
                    }
        </div>
    </div>
    </Container>
  )
}

export default ProductView



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { instance } from "../../api/axios";

// const ProductView = () => {
//   const [productData, setProductData] = useState([]);
//   let productDataInURL = useParams({});

//   useEffect(() => {
//     let isProductFetched = true;

//     instance(`/product/single-product/${productDataInURL.id}`)
//       .then((response) => setProductData(response.data))
//       .catch((err) => console.log(err));

//     return () => {
//       isProductFetched = false;
//     };
//   }, [productDataInURL.id]);

//   console.log(productData);

//   return (
//     <>
//       <div className="container">
//         {productData? (
//           <div className="product__block">
//                 <h2>{productData.singleProduct?.at(0).productName_uz}</h2>
//           </div>
//         ) : (
//           <div className="loading">
//             <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProductView;