import React, { useEffect, useState } from "react";
import uzb from "../../assets/images/uzb-flag.svg";
import rus from "../../assets/images/russia-flag.png";
import { FiPhoneCall, FiMail, FiSearch } from "react-icons/fi";
import {FaTimes} from "react-icons/fa"
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiChevronLeft } from "react-icons/bi"
import "./Nav.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { instance } from "../../api/axios";
import { v4 as uuidv4 } from 'uuid';
import i18next from "../../language/i18next";
import { useTranslation } from "react-i18next";
import { useDispatch,useSelector } from "react-redux";

const Nav = () => {
  const [searchInp, setSearchInp] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [categoryOpen,setCategoryOpen]=useState(false)
  const {t}=useTranslation();
  const [selectedLang,setSelectedLang]=useState(localStorage.getItem("lang"));
  const exceptionalRoutes=["/login","/admin","/admin/create","/admin/orders","/admin/orders/all","/admin/orders/called","/admin/orders/uncalled",'/admin/manage'];
  const {pathname}=useLocation();
  const dispatch=useDispatch();
  const langCode=useSelector(state=>state?.lang.langCode);
  const [categoryMain,setCategoryMain]=useState(null);
  const [subCategoryOpen,setSubCategoryOpen]=useState(false);
  const [subCategoryInd,setSubCategoryInd]=useState(0);
  const [subCategoryHead,setSubCategoryHead]=useState("")



  function changeLang(langCode){
    i18next.changeLanguage(langCode);
    setSelectedLang(langCode);
    dispatch({langCode:langCode,type:"CHANGE_LANG"})
  }
  useEffect(() => {
    let isFetched=false;
    instance(`/product/search/${searchInp}`)
      .then((responce) => {
        setSearchResult(responce.data);
    })
      .catch((err) => {
        setSearchResult([]);
        console.error(err);
      });

      instance("/category/category-nest")
      .then(responce=>setCategoryMain(responce.data))
      .catch(err=>console.error(err));

      return()=>{
        isFetched=true;
    }
  }, [searchInp]);

  return !exceptionalRoutes.includes(pathname)? (
    <nav>
      <div onClick={e=>{setCategoryOpen(false);document.body.style.overflow="auto"}} style={categoryOpen?{display:"block"}:{display:"none"}} className="modal__category__aside"></div>
      {/* <div style={categoryOpen?{display:"block"}:{display:"none"}} className="category__aside"> */}
        <div style={categoryOpen?{transform:"translateX(0)"}:{transform:"translateX(-800px)"}} className="category__aside__content">
          <div className="category__aside__head">
            <img className="main__logo"  src="http://localhost:5173/src/assets/images/logo-footer.svg" alt="" />
            <button className="category__aside__close" onClick={e=>{setCategoryOpen(false);document.body.style.overflow="auto"}}><FaTimes/></button>
          </div>
            <div className="category__aside__content__wrapper">
            <div style={subCategoryOpen?{transform:"translateX(-100%)"}:{transform:"translateX(0%)"}} className="category__aside__main">
            <h3>{langCode=="uz"?"Категориялар":"Категории"}</h3>
            <ul>
              {
                  langCode=="uz"?categoryMain?.mainCategory_uz.map((x,i)=>
                      <li key={uuidv4()} onClick={e=>{setSubCategoryOpen(true);setSubCategoryInd(i);setSubCategoryHead(x)}}>{x}</li>
                    )
                    :
                    categoryMain?.mainCategory_ru.map((x,i)=>
                        <li key={uuidv4()} onClick={e=>{setSubCategoryOpen(true);setSubCategoryInd(i);setSubCategoryHead(x)}}>{x}</li>
                      )
              }
            </ul>
          </div>
          <div style={subCategoryOpen?{transform:"translateX(-100%)"}:{transform:"translateX(100%)"}} className="category__aside__sub">
              <h3 onClick={e=>setSubCategoryOpen(false)}><BiChevronLeft/> Main Menu</h3>
              <Link onClick={e=>setCategoryOpen(false)} to={`/maincategory/${subCategoryHead}`}>{subCategoryHead}</Link>
                {
                                categoryMain?.productSubCategories_uz[subCategoryInd].length>1?
                                <ul>
                                  {
                                    langCode=="uz"?categoryMain?.productSubCategories_uz[subCategoryInd].map((x,i)=>
                                      <li key={uuidv4()}><Link onClick={e=>setCategoryOpen(false)} to={`/subcategory/${x}`}>{x}</Link></li>
                                    )
                                    :
                                    categoryMain?.productSubCategories_ru[subCategoryInd].map((x,i)=>
                                      <li key={uuidv4()}><Link onClick={e=>setCategoryOpen(false)} to={`/subcategory/${x}`}>{x}</Link></li>
                                    )
                                  }
                                </ul>
                                :<></>
                }
          </div>
            </div>
        </div>
      {/* </div> */}
      <div className="nav__content">
        <div className="nav__sub">
          <div className="language">
            <div onClick={() => changeLang('uz')} style={selectedLang==='uz' ? { borderBottom: "1px solid dodgerblue" } : { borderBottom: "1px solid transparent" } } className="uzbFlag">
              <img style={{ width: "100%" }} src={uzb} alt="" />
            </div>
            <div onClick={() => changeLang('ru')}style={selectedLang ==='ru'  ? { borderBottom: "1px solid dodgerblue" }  : { borderBottom: "1px solid transparent" } }
              className="rusFlag"
            >
              <img style={{ width: "100%" }} src={rus} alt="" />
            </div>
          </div>
          <div className="phone">
            <a href="tel:+998911860085">
              <FiPhoneCall />
              <p>+998 91 186 00 85</p>
            </a>
          </div>
          <div className="email">
            <a href="mailto:erkinjon.hodjaev@gmail.com">
              <FiMail />
              <p>erkinjon.hodjaev@gmail.com</p>
            </a>
          </div>
        </div>

        <div className="nav__main">
          <div className="nav__main-content">

            <div className="nav__main-logo">
            <Link to="/">
              <img className="main__logo"  src={Logo} alt="" />
            </Link>
            <button onClick={e=>{setCategoryOpen(!categoryOpen);document.body.style.overflow="hidden"}}><AiOutlineAppstore/></button>
            </div>

            <div className="nav__main-searchbar">
              <div className="nav__main-search">
                <form>
                  <input
                    value={searchInp}
                    onChange={(e) => setSearchInp(e.target.value)}
                    type="text"
                    placeholder={t("productSearchInp")}
                  />
                  <button disabled className="form__btn">
                    <FiSearch />
                  </button>
                </form>
                {searchInp.length > 0 ? (
                    
                    <div className="search__results">
                        <div className="search__results-info">
                            <div className="search__info-text">
                            <p>{langCode=="uz"?"Қидириш натижалари:":"Результаты поиска:"}</p>
                            <span>#{searchInp}</span>
                            </div>
                            <b>{searchResult.length} {langCode=="uz"? "Натижа":"Полученные результаты"}</b>
                            <button onClick={()=>{setSearchInp(""); setSearchResult([])}}>{langCode=='uz'?"Бекор қилиш":"Отмена"}</button>
                        </div>
                    {
                    
                        searchResult.length>=1?
                            searchResult?.map((x) => (
                            <Link key={uuidv4()} to={`/product-view/${x._id}`} onClick={()=>{setSearchInp(""); setSearchResult([])}}>
                              <div key={x._id} className="serach-results__item">
                                <img src={x.productImages?.at(0)} alt="" />
                                <h4>{langCode=='uz'?x.productName_uz:x.productName_ru}</h4>
                                <strong>
                                  {x.productSizesAndQuantity.length > 1
                                    ? `${
                                        x.productSizesAndQuantity[0].price
                                      } - ${
                                        x.productSizesAndQuantity.slice(-1)[0]
                                          .price
                                      } CУМ`
                                    : 
                                    `${x.productSizesAndQuantity[0].price} CУМ`}
                                </strong>
                              </div>
                            </Link>
                            ))

                            :

                        <div className="no__result">
                            <img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/no-results.66419f6a48c60be00243.png" alt="" />
                        </div>
                    
                    }
                  </div>
                    

                ) : (
                  <></>
                )}
              </div>
              

              <ul className="main__links">
                <li>
                  <NavLink to="/">{t("subNavLinks.main")}</NavLink>
                </li>
                <li>
                  <NavLink to="/sponsor">{t('subNavLinks.sponsors')}</NavLink>
                </li>
                <li>
                  <NavLink to="/about">{t('subNavLinks.about')}</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">{t('subNavLinks.contact')}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ) : <></>;
};

export default Nav;
