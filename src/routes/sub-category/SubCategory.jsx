import "./SubCategory.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api/axios";
import Aside from "../../components/aside/Aside";
import { Container } from "../../utils/Utils";
import ProductCard from "../../components/product-card/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";


const SubCategory = () => {
    const [subCategoryData, setSubCategoryData] = useState(null);
    const subCategoryName = useParams().subCategoryName;
    const langCode=useSelector(state=>state?.lang.langCode)

    const [categoryData,setCategoryData]=useState([]);
    useEffect(()=>{
        let isFetched=false;
        instance("/category/category-nest")
        .then(responce=>setCategoryData(responce.data))
        .catch(err=>console.error(err));
        return()=>{
            isFetched=true;
        }
    },[])

    useEffect(() => {
      instance(`/category/subcategories/${subCategoryName}`)
        .then((responce) => setSubCategoryData(responce.data))
        .catch((err) => console.error(err));
    }, [subCategoryName]);
    console.log(subCategoryData);
  return (
    <div className="main__category-main">
    <Container>
      <div className="main__category">
        <Aside categoryData={categoryData} className="side" />
        <div className="main__category-content">
          <h1>{langCode=="uz"? subCategoryData?.subCategoryTranslate.uz:subCategoryData?.subCategoryTranslate.ru}</h1>
          <div className="main__category__wrapper">
            {subCategoryData?.subCategory?.map((x) => (
              <ProductCard key={uuidv4()} productData={x} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  </div>
  )
}

export default SubCategory