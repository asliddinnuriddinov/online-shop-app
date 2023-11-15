import React from 'react';
import "./SubFooter.scss"
import { Container } from '../../utils/Utils';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SubFooter = () => {
    const {t}=useTranslation();
    const exceptionalRoutes=["/login","/admin","/admin/create","/admin/orders","/admin/orders/all","/admin/orders/called","/admin/orders/uncalled",'/admin/manage'];
    const {pathname}=useLocation();
  return !exceptionalRoutes.includes(pathname)? (
   <Container>
        <div className="sub__footer">
            <h1>{t("subFooter.head")}</h1>
            <ul>
                <li>
                    <h3>{t("subFooter.firstLi.h3")}</h3>
                    <p>{t("subFooter.firstLi.p")}</p>
                </li>
                <li>
                <h3>{t("subFooter.secondLi.h3")}</h3>
                    <p>{t("subFooter.secondLi.p")}</p>
                </li>
                <li>
                <h3>{t("subFooter.thirdLi.h3")}</h3>
                    <p>{t("subFooter.thirdLi.p")}</p>
                </li>
                <li>
                <h3>{t("subFooter.fourthLi.h3")}</h3>
                    <p>{t("subFooter.fourthLi.p")}</p>
                </li>
            </ul>
        </div>
   </Container>
  ):<></>;
}

export default SubFooter