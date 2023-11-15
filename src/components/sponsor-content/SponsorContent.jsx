import React from 'react';
import "./SponsorContent.scss"
import { Container } from '../../utils/Utils';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SponsorContent = () => {
  const {t}=useTranslation();
  return (
    <div className="sponsor">
        <Container>
            <h2>{t("sponsorsPage.h2")}</h2>
            <div className="sponsor__main">
                <img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/repair.e943b1aab634928dc45e.png" alt="" />
                <h3>{t("sponsorsPage.h3")}</h3>
                <Link to="/">{t("sponsorsPage.a")}</Link>
            </div>
        </Container>
    </div>
  )
}

export default SponsorContent