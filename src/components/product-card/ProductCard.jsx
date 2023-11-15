import React from 'react';
import "./ProductCard.scss"
import { DefaultButton } from '../../utils/Utils';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { BsHandIndexThumb } from "react-icons/bs";
import { useSelector } from 'react-redux';


const ProductCard = ({productData}) => {
  const productOptions=productData.productSizesAndQuantity.length;
  const langCode=useSelector(state=>state?.lang.langCode);
  productData.count=1;
  return (
    <div className='product-card'>
        <Link to={`/product-view/${productData._id}`}>
        <img src={productData.productImages?.at(0)} alt="" />
        </Link>
        <h3>{langCode=='uz'? productData.productName_uz:productData.productName_ru}</h3>
        <div className="product-card__categories">
          <span>{langCode=='uz'? productData.productMainCategory_uz:productData.productMainCategory_ru}</span>
          <FiChevronRight/>
          <span>{langCode=='uz'? productData.productSubCategory_uz:productData.productSubCategory_ru}</span>
        </div>
        <div className="product-card__price">
          <strong>{
          productData.productSizesAndQuantity.length>1?
          `${productData.productSizesAndQuantity[0].price} - ${productData.productSizesAndQuantity.slice(-1)[0].price} CУМ`
          :
          `${productData.productSizesAndQuantity[0].price} CУМ`

        }</strong>
        </div>
        {
          productOptions===1?
          <DefaultButton text={langCode=="uz"?"Саватга қўшиш":"Добавить в корзину"} cartProductData={productData}/>
          :
          <Link className='defaultBtn' to={`/product-view/${productData._id}`}><BsHandIndexThumb/>{langCode=="uz"? "Танлаш":"Выбор"}</Link>
        }
    </div>
  )
}

export default ProductCard