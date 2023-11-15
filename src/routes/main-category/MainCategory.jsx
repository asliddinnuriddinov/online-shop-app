import { useEffect,useState } from 'react'
import MainCategoryView from '../../components/main-category-view/MainCategoryView'
import { instance } from '../../api/axios';

const MainCategory = () => {
  const [categoryMain,setCategoryMain]=useState([]);
  useEffect(()=>{
      let isFetched=false;
      instance("/category/category-nest")
      .then(responce=>setCategoryMain(responce.data))
      .catch(err=>console.error(err));
      return()=>{
          isFetched=true;
      }
  },[])
  return (
    <>
        <MainCategoryView categoryData={categoryMain}/>
    </>
  )
}

export default MainCategory