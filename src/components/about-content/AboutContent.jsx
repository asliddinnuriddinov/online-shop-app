import React from "react";
import "./AboutContent.scss";
import { Container } from "../../utils/Utils";
import { useTranslation } from "react-i18next";

const AboutContent = () => {
  const {t}=useTranslation();
  return (
    <div className="about">
      <Container>
            <div className="about__content">
            <h1>{t("aboutPage.h1")}</h1>
            <p> {t("aboutPage.1-p")}</p>
            <p> {t("aboutPage.2-p")}</p>
            <p>{t("aboutPage.3-p")}</p>
        <div><img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/office-min%202.153cd0976584138310b4.jpg" alt="" /></div>
        <p>{t("aboutPage.4-p")}</p>
        <ul>
            <li>{t("aboutPage.1-li")}</li>
            <li>{t("aboutPage.2-li")}</li>
            <li>{t("aboutPage.3-li")}</li>
            <li>{t("aboutPage.4-li")}</li>
            <li>{t("aboutPage.5-li")}</li>
            <li>{t("aboutPage.6-li")}</li>
            <li>{t("aboutPage.7-li")}</li>
            <li>{t("aboutPage.8-li")}</li>
        </ul>
            </div>
      </Container>
    </div>
  );
};

export default AboutContent;
