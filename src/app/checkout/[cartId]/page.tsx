import React from 'react'
import CheckoutForm from '../../_components/CheckoutForm/CheckoutForm'
import { log } from 'console';

export default async function Checkout({params}:{params:{cartId:string}}) {
  const {cartId}=await params
  console.log(cartId);
  
  return (
    <CheckoutForm cartId={cartId}></CheckoutForm>
  )
}
