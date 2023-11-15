import { useEffect,useState,Fragment } from "react";
import {instance} from "../../api/axios";
import { v4 as uuidv4 } from 'uuid';
import ProductCarousel from "../product-cardcarousel/ProductCarousel";
import "./Main.scss"
import { Container } from "../../utils/Utils";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";
// import { useTranslation } from "react-i18next";

const Main = () => {
  const [homeReelData,setHomeReelData]=useState([]);
  const langCode=useSelector(state=>state?.lang.langCode)
  const [isLoading,setIsLoading]=useState(false)
  // useTranslation();

  useEffect(()=>{
    let isDataFetched=false;
    instance("/category/category-reel")
    .then(responce=>{setHomeReelData(responce.data);setIsLoading(true)})
    .catch(err=>{console.error(err);setIsLoading(true)});
    return ()=>{
      isDataFetched=true;
    }
  },[]);
  return isLoading? (
    <div className="home__prodcut-carousel">
      <Container>
      
      {
        homeReelData.slice(0,4).map(category=>
              <Fragment key={uuidv4()}>
                <h2 key={uuidv4()}>{langCode=='uz'?category.categoryName_uz:category.categoryName_ru}</h2>
                <ProductCarousel categoryData={category}/>
              </Fragment>
          )
      }
    
      </Container>
      </div>
  ): <Loader/>
}

export default Main