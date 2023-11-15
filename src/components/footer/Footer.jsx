import React from "react";
import "./Footer.scss";
import { CiLocationOn } from "react-icons/ci";
import {
  FiPhoneCall,
  FiMail,
  FiYoutube,
  FiSend,
  FiFacebook,
} from "react-icons/fi";
import logoFooter from "../../assets/images/logo-footer.svg";
import { NavLink,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t}=useTranslation();
  const exceptionalRoutes=["/login","/admin","/admin/create","/admin/orders","/admin/orders/all","/admin/orders/called","/admin/orders/uncalled",'/admin/manage'];
  const {pathname}=useLocation();
  
  return !exceptionalRoutes.includes(pathname)? (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__top">
          <div className="footer__top-info">
            <CiLocationOn style={{ width: "100px" }} />
            <div>
              <b>{t("footer.location.b")}</b>
              <p>
              {t("footer.location.p")}
              </p>
            </div>
          </div>
          <div className="footer__top-info">
            <FiPhoneCall style={{ width: "60px" }} />
            <div>
              <b>{t("footer.contact.b")}</b>
              <p>+998 91 186 00 85</p>
            </div>
          </div>
          <div className="footer__top-info">
            <FiMail />
            <div>
              <b>{t("footer.email.b")}</b>
              <p>erkinjon.hodjaev@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__bottom-info">
            <img src={logoFooter} alt="" />
            <p>
            {t("footer.companyInfo")}
            </p>
            <h3>{t("footer.followUs")}</h3>
            <div className="media">
              <FiSend />
              <FiFacebook />
              <FiYoutube />
            </div>
          </div>
          <div  className="footer__bottom-info footer__bottom-info-2">
            <h3>{t("footer.linksHead")}</h3>
            <span></span>
            <ul>
              <li>
                <NavLink to="/">{t("subNavLinks.main")}</NavLink>
              </li>
              <li>
                <NavLink to="/sponsor">{t("subNavLinks.sponsors")}</NavLink>
              </li>
              <li>
                <NavLink to="/about">{t("subNavLinks.about")}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{t("subNavLinks.contact")}</NavLink>
              </li>
            </ul>
          </div>
          <div  className="footer__bottom-info">
            <h3>{t("footer.forSuggestions.h3")}</h3>
            <span></span>
            <p>
            {t("footer.forSuggestions.p")}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : <></>;
};

export default Footer;
