import React, { useState } from 'react';
import "./AdminAside.scss";
import logo from "../../assets/images/logo-footer.svg";
import uzb from "../../assets/images/uzb-flag.svg";
import rus from "../../assets/images/russia-flag.png";
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiShoppingCart,FiEdit, FiPlus } from "react-icons/fi"
import { IoAnalyticsOutline } from "react-icons/io5"
import { RxExit } from "react-icons/rx";
import i18next from 'i18next';
import { useDispatch } from 'react-redux';

const AdminAside = () => {
    const [selectedLang,setSelectedLang]=useState(localStorage.getItem("lang")||"uz");
    const {pathname}=useLocation();
    const orderStyle=pathname=="/admin/orders/called"||pathname=="/admin/orders/uncalled";
    const dispatch=useDispatch()

    const signOut=()=>{
        dispatch({type:"LOGOUT"})
    }

    function changeLang(langCode){
        i18next.changeLanguage(langCode)
        setSelectedLang(langCode)
        dispatch({langCode:langCode,type:"CHANGE_LANG"})
    }
  return (
    <div className='admin__aside'>
        <h1>
            <Link to={'/'}>
            <img src={logo} width={200} height={170} alt="" />
            </Link>
        </h1>
        <div className="language__admin">
            <div onClick={() => changeLang('uz')} style={selectedLang==='uz' ? { borderBottom: "3px solid dodgerblue" } : { borderBottom: "0px" } } className="uzbFlag">
              <img style={{ width: "42px" }} src={uzb} alt="" />
            </div>
            <div onClick={() => changeLang('ru')}style={selectedLang ==='ru'  ? { borderBottom: "3px solid dodgerblue" }  : { borderBottom: "0", width: "42px" } }
              className="rusFlag"
            >
              <img style={{ width: "42px" }} src={rus} alt="" />
            </div>
          </div>

            <div className="admin__account">
                <div className="admin__account-logo">
                    <MdOutlineAdminPanelSettings/>
                </div>
                <div className="admin__account-info">
                    <p>6270F64B</p>
                    <small>Админ</small>
                </div>
            </div>

            <ul className='admin__aside-links'>
                <li>
                    <NavLink  className={({isActive})=>isActive?"admin__active-link":""} to={'/admin/orders/all'} style={orderStyle?{backgroundColor:"#fff",color:"dodgerblue"}:{}}>
                        <FiShoppingCart/> Буюртмалар
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({isActive})=>isActive?"admin__active-link":""} to={'/admin/manage'}>
                        <FiEdit/> Маҳсулот бошқариш
                    </NavLink>
                </li>

                <li>
                    <NavLink className={({isActive})=>isActive?"admin__active-link":""} to={'/admin/create'}>
                        <FiPlus/> Маҳсулот яратиш
                    </NavLink>
                </li>

                <li>
                    <NavLink>
                        <IoAnalyticsOutline/> Aналитика
                    </NavLink>
                </li>
            </ul>

            <button onClick={signOut} className='admin__logout'>
                <RxExit/>
                Тизимдан чиқиш
            </button>

    </div>
  )
}

export default AdminAside