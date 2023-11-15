import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../api/axios";
import Aside from "../aside/Aside";
import "./MainCategoryView.scss";
import { Container } from "../../utils/Utils";
import ProductCard from "../product-card/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

const MainCategoryView = ({ categoryData }) => {
  const [mainCategoryData, setMainCategoryData] = useState(null);
  const mainCategoryName = useParams().mainCategoryName;
  const langCode=useSelector(state=>state?.lang.langCode)
  useEffect(() => {
    instance(`/category/categories/${mainCategoryName}`)
      .then((responce) => setMainCategoryData(responce.data))
      .catch((err) => console.error(err));
  }, [mainCategoryName]);
  return (
    <div className="main__category-main">
      <Container>
        <div className="main__category">
          <Aside className="side" categoryData={categoryData} />
          <div className="main__category-content">
            <h1>{langCode=="uz"?mainCategoryData?.maincategoryTranslate.uz:mainCategoryData?.maincategoryTranslate.ru}</h1>
            <div className="main__category__wrapper">
              {mainCategoryData?.maincategory?.map((x) => (
                <ProductCard key={uuidv4()} productData={x} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MainCategoryView;
