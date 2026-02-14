'use client'
import React from 'react'
import  Image  from 'next/image';
import {

  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';

export default function ProductImg({images}:{images:string[]}) {
  return<>

  <Carousel   
   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
   opts={{
    
    loop: true,
  }}>
  <CarouselContent>
   { images.map((src)=>{
        return    <CarouselItem key={src}>
        <img
         width={300}
        height={400}
        src={src}
        alt={src}
        className='w-full'
        />






        </CarouselItem>
    })}



  </CarouselContent>
  
</Carousel>
  
  </>
}
