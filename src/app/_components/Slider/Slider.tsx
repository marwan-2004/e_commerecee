'use client'
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image'
import { Category } from '@/types/productsInterface';
import { Divide } from 'lucide-react';


export default function Slider({categories}:{categories:Category[]}) {
  return <>


  <Swiper
    modules={[Autoplay]} 
    autoplay={{
        delay:2000
    }}
      spaceBetween={0}
      slidesPerView={8}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     {categories?.map((category,index)=>{return <div key={category._id}>
        <SwiperSlide key={category._id}><Image className='w-full h-50 object-cover' src={category.image} alt="img1" width={600} height={300}/></SwiperSlide>
        <h2>{category.name}</h2>
     </div> })} 

      
      
    </Swiper>
  
  
  </>
}
