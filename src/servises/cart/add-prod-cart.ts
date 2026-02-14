'use server'
import { getAccessToken } from "@/schema/access-token"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"


export async function addToCart(productId:string){

    const token=await getAccessToken()
   
if(!token){
    throw new Error('no token')
}

    const resp= await fetch (`https://ecommerce.routemisr.com/api/v2/cart` , {
        cache:'no-store',
      method:'POST',
      body: JSON.stringify({
        productId
      }) ,
      headers: {
        token: token ,
          'content-type' : 'application/json'
      }
  })
  const payload =await resp.json()
  return payload
}


//server actions