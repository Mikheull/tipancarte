import React, { useState } from "react";
import Image from 'next/image'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";


function ProductImages({ images }) {
    const [productSwiper, setProductSwiper] = useState({});

    return (
        <>
            <Swiper modules={[Navigation]} className="relative" loop={(images.length > 1) ? true : false} onInit={(swp) => { setProductSwiper(swp) }}>
                <div>
                    {images.map((item, i) => (
                        <SwiperSlide key={i}>
                            <Image src={item.image} alt="Image du produit" width="100%" height="100%" layout="responsive" objectFit="contain"  className="w-full"/>
                        </SwiperSlide>
                    ))}
                </div>
                
                {(images.length > 1) && (
                    <>
                        <img src="/images/icons/arrow-left-circle.svg" alt="Icon gauche" className="cursor-pointer absolute left-2 top-1/2 z-10" onClick={() => productSwiper.slidePrev()}/>
                        <img src="/images/icons/arrow-right-circle.svg" alt="Icon droite" className="cursor-pointer absolute right-2 top-1/2 z-10" onClick={() => productSwiper.slideNext()}/>
                    </>
                )}
            </Swiper>
        </>
    )
}

export default ProductImages
