import React, { useEffect, useState } from 'react';
import "./Banner.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Navigation,Autoplay } from 'swiper/modules';
import { instance } from '../../api/axios';
import Aside from '../aside/Aside';
const Banner = () => {
    const [categoryMain,setCategoryMain]=useState([]);
    useEffect(()=>{
        let isFetched=false;
        instance("/category/category-nest")
        .then(responce=>setCategoryMain(responce.data))
        .catch(err=>console.error(err));
        return()=>{
            isFetched=true;
        }
    },[])
  return (
    <div className='hero__wrapper'>
        <div className="hero">
            <Aside  categoryData={categoryMain}/>
        <Swiper
        pagination={true}
        modules={[Pagination,Navigation,Autoplay]}
        loop={true}
        autoplay={{delay:3000,disableOnInteraction:false}}
        speed={900}
        className="banner__swiper">

        <SwiperSlide>
            <img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/1.f750064639be81611932305b288222c1.svg" alt="" />
            
        </SwiperSlide>
        <SwiperSlide className='banner__second-slide'>
            <img src="https://mold-components-14sxqbw1r-ijalalov69-gmailcom.vercel.app/static/media/2.988a32fc2cb5183ecf3d0abd56d8d4d7.svg" alt="" />
        </SwiperSlide>
    </Swiper>
        </div>
    </div>
  )
}

export default Banner