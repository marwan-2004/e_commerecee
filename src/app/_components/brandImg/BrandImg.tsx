'use client'
import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  images: string[]
}

export default function BrandImg({ images }: Props) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {images.map((src) => (
          <CarouselItem key={src}>
            <Image
              src={src}
              width={300}
              height={400}
              alt="brand"
              className="w-full object-contain"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
