import { Brand, ProductItem } from '@/types/productsInterface';
import React from 'react'
import MainSlider from '../_components/MainSlider/MainSlider';
import CategorySlider from '../_components/CategorySlider/CategorySlider';
import { BrandCard } from '../_components/BrandCard/BrandCard';

export default async function Brands() {
   const response=await fetch('https://ecommerce.routemisr.com/api/v1/brands' , {
      method:'GET',
      // cache:'force-cache',   //ssg
      // cache : 'no-store'  //ssr
      next:{
        revalidate:60    //isr
      }
    })
    const {data : allBrands}: {data : Brand[]}=await response.json()
    console.log(allBrands[0]);
    
    return (
      <>
      <MainSlider/>
      <CategorySlider/>
      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {allBrands.map((brand)=>
        <BrandCard   key={brand._id}  brand={brand}/>
  
        )}
      </div>
      </>
    );
}
