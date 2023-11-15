import React, { useState,useEffect } from 'react'
import "./AdminManage.scss";
import { instance } from '../../api/axios';
import ManageProduct from '../manage-product/ManageProduct';

const AdminManage = () => {
    const [data,setData]=useState([]);
    const [searchData,setSearchData]=useState([]);
    const [searchInp,setSearchInp]=useState('');
    
  useEffect(()=>{
    let isDataFetched=false;
    instance("/product/all")
    .then(responce=>{setData(responce.data.allproducts)})
    .catch(err=>{console.error(err)});
    return ()=>{
      isDataFetched=true;
    }
  },[]);
  useEffect(()=>{
    if(searchInp.length>0){
        instance(`/product/search/${searchInp}`)
        .then(responce=>setSearchData(responce.data))
        .catch(err=>console.error(err))
    }
  },[searchInp]);
  return (
    <div className='admin__manage'>
        <h1>Маҳсулотларни бошқариш</h1>
        <div className="admin__search">
            <form>
                <input value={searchInp} onChange={e=>setSearchInp(e.target.value)} type="text" placeholder='Маҳсулотларни қидириш' />
            </form>
            <p>Барча маҳсулотлар сони: <span> {data?.length}</span></p>
        </div>

        <div className="manage__products">
            {
                searchData.length>0&&searchInp.length>0?
                searchData.map(x=>
                            <ManageProduct key={x._id} product={x}/>
                    )
                :
                data?.map(x=>
                            <ManageProduct key={x._id} product={x}/>
                    )    
            }
        </div>

    </div>
  )
}

export default AdminManage