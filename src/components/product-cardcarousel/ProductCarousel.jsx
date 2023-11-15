import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './ProductCarousel.scss';

import { Autoplay, Navigation } from 'swiper/modules';
import ProductCard from '../product-card/ProductCard';

const ProductCarousel = ({categoryData}) => {
  return (
    <div>
          <Swiper
          breakpoints={{
            360:{
                width:360,
                slidesPerView:1.1,
            },
            460:{
                width:460,
                slidesPerView:1.7,
            },
            560:{
                width:560,
                slidesPerView:1.9,
            },
            760:{
                width:760,
                slidesPerView:3,
            },
          }}
        slidesPerView={8}
        slidesPerGroup={1}
        spaceBetween={10}
        autoplay={{delay:400000,disableOnInteraction:false}}
        speed={600}
        loop={true}
        draggable={true}
        navigation={true}
        modules={[Autoplay,Navigation]}
        className="product__mySwiper"
      >
      {
          categoryData.allRefinedProducts.map(product=>
            <SwiperSlide className='swiper__slide-product' key={product._id}>
                <ProductCard productData={product}/>
            </SwiperSlide>
        )
      }
      </Swiper>
    </div>
  )
}

export default ProductCarousel