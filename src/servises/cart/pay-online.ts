'use server'
import { getAccessToken } from "@/schema/access-token"
import { shipping } from "@/types/cart-response"



export async function payOnlineOrder(cartId:string ,shippingAddress:shipping ){

    const token=await getAccessToken()
   
if(!token){
    throw new Error('no token')
}

    const resp= await fetch (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` , {
        
      method:'POST',
      body: JSON.stringify({
        shippingAddress
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