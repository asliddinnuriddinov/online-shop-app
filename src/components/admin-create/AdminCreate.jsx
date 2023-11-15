import React, { useState,useEffect } from 'react';
import { instance } from '../../api/axios';
import "./AdminCreate.scss";
import { v4 as uuidv4 } from 'uuid';
import { FiCheckCircle } from "react-icons/fi";
import { BsFillCameraFill,BsArrowRightCircleFill } from "react-icons/bs"

const AdminCreate = () => {
    const [count,setCount]=useState(0);
    const [categoryData,setCategoryData]=useState(null);
    const [selectedCategory,setSelectedCategory]=useState(999)

    function createProduct(e){
        e.preventDefault()
    }

    useEffect(()=>{
        let isFetched=false;
        instance("/category/category-nest")
        .then(responce=>setCategoryData(responce.data))
        .catch(err=>console.error(err));
        return()=>{
            isFetched=true;
        }
    },[]);

    function selectCategory(e){
        categoryData?.mainCategory_uz.map((x,i)=>x==e.target.value?setSelectedCategory(i):<></>);
    }

  return (
    <div className='admin__create'>
        <h1>
        Маҳсулот яратиш
        </h1>

        <form onSubmit={createProduct} className='create__form'>
            <input required type="text" placeholder='Маҳсулот номи' />
            <input required type="text" placeholder='Маҳсулот маълумотлари' />
            <div className="create__product-sizes">
                <input required type="text" placeholder='Маҳсулот ўлчамлари' />
                <input required type="text" placeholder='Маҳсулот охирги нархи' />
                <div className="create__product-count">
                            <button type='button' onClick={e=>count>0?setCount(count-1):null}>-</button>
                            <span>{count}</span>
                            <button type='button' onClick={e=>setCount(count+1)}>+</button>
                </div>
                <button type='button' className='create__product-right-btn'>
                    <BsArrowRightCircleFill/>
                </button>
            </div>
            <div className="create__product-category">
                <input required onChange={selectCategory} type="text" list='create__main-category' />
            <datalist  id='create__main-category'>
                {
                    categoryData?.mainCategory_uz.map((x,i)=>
                            <option key={uuidv4()} value={x}>{x}</option>
                        )
                }
            </datalist>

            <input required type="text" list='create__main-subcategory' />
            <datalist id='create__main-subcategory' size={10} autoFocus={true}>
                {
                    categoryData?.productSubCategories_uz?.at(selectedCategory)
                    ?
                    categoryData?.productSubCategories_uz[selectedCategory].map(x=>
                            <option key={uuidv4()} value={x}>{x}</option>
                        )
                    :
                        <></>
                }
            </datalist>
                </div>

            <input required type="file" hidden id='create__product-img' />
            <label className='create__img-label' htmlFor="create__product-img">
                <BsFillCameraFill/>
                <p>Rasm yuklash</p>
                <span>.jpg/ .jpeg/ .png</span>
            </label>
            <button className='create__product-btn'><FiCheckCircle/> Маҳсулот Яратиш</button>
        </form>

    </div>
  )
}

export default AdminCreate