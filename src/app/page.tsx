import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/productsInterface";
import { log } from "console";
import Image from "next/image";
import { ProductCard } from './_components/ProductCard/ProductCard';
import MainSlider from './_components/MainSlider/MainSlider';
import CategorySlider from './_components/CategorySlider/CategorySlider'
export default async function Home() {
  const response=await fetch('https://ecommerce.routemisr.com/api/v1/products' , {
    method:'GET',
    // cache:'force-cache',   //ssg
    // cache : 'no-store'  //ssr
    next:{
      revalidate:60    //isr
    }
  })
  const {data : allProducts}: {data : ProductItem[]}=await response.json()
  console.log(allProducts[0]);
  
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {allProducts.map((prod)=>
      <ProductCard   key={prod._id}  prod={prod}/>

      )}
    </div>
    </>
  );
}
