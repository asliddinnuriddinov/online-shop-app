import React from 'react';
import "./ContactContent.scss"
import { Container } from '../../utils/Utils';
import {FiPhoneCall,FiMail,FiYoutube,FiSend,FiFacebook} from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

const ContactContent = () => {
  const {t}=useTranslation();
  return (
    <div className="contact">
        <Container>
            <div className="contact__wrapper">
                <h1>{t("contactPage.h1")}</h1>
                <a href="tel:+998911860085"><FiPhoneCall/>+998911860085</a>
                <br />
                <a href="mailto:erkinjon.hodjaev@gmail.com"><FiMail/>erkinjon.hodjaev@gmail.com</a>
                <p><CiLocationOn/>{t("contactPage.p")}</p>
                <strong>{t("contactPage.strong")}</strong>
                <div className="contact__medias">
                    <a href="https://web.telegram.org/a/"><FiSend/></a>
                    <a href="https://www.facebook.com/"><FiFacebook/></a>
                    <a href="https://www.youtube.com/"><FiYoutube/></a>
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.072884043769!2d69.20123767521314!3d41.28551820230904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba578f4f58d%3A0xd7a2ecf23413b7a0!2sNajot%20Ta&#39;lim%20Chilonzor%20Filial!5e0!3m2!1sru!2s!4v1693732620324!5m2!1sru!2s" className='contact__map' ></iframe>
            </div>
        </Container>
    </div>
  )
}

export default ContactContent