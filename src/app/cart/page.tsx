'use client'
import cartImg from '../../assets/images/cart.webp'
import { deleteCartItem } from '@/servises/cart/delete-cart-item'
import { updateCartItem } from '@/servises/cart/update-cart'
import { CartResponse } from '@/types/cart-response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button';
import { clearCart } from '@/servises/cart/clear-cart'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const queryClient=  useQueryClient()
  const{data:cartData ,isLoading,isError } =useQuery<CartResponse>({
    queryKey:['get-cart'],
    queryFn:async()=>{
      const resp=await fetch('/api/cart') 
      const payload=await resp.json()
      return payload
    }
  })



  //delete cart
  const {mutate:delCartItem , isPending }= useMutation({
    mutationFn:deleteCartItem ,
    onSuccess:()=>{
      toast.success('item deleted')
      queryClient.invalidateQueries({queryKey:['get-cart']})
    } ,
    onError:()=>{
      toast.error('error')

    }

  })



  //update cart
  const {mutate:updateCart , isPending:updateLoading}= useMutation({
    mutationFn:updateCartItem ,
    onSuccess:(data)=>{toast.success('product updated') 
    queryClient.invalidateQueries({queryKey:['get-cart']})
    } ,
    onError:()=>{toast.error('error')}
  })

  function handleUpdate(productId:string ,count:number){
    updateCart({productId,count})
  }


const numOfCartItems = cartData?.numOfCartItems ?? 0;


  //clear cart

 const {mutate:removeCart , data}= useMutation({
    mutationFn:clearCart ,
    onSuccess:(data)=>{toast.success('cart updated') 
    queryClient.invalidateQueries({queryKey:['get-cart']})
    } ,
    onError:()=>{toast.error('error')}
  })


  if(isError){return <h2>error</h2>}
  if(isLoading){return <h2>loading</h2>}


  return <>


  {(cartData?.numOfCartItems ?? 0) > 0 ? <div className="flex gap-5">
  <div className="w-3/4">
<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartData?.data.products.map((prod)=>{ return <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={prod.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {prod.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button onClick={()=>{ handleUpdate(prod.product._id, prod.count-1) }} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <span  id="counter-input-1" data-input-counter className="shrink-0 mx-3 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"  >
                {prod.count}
              </span>
              <button  onClick={()=>{ handleUpdate(prod.product._id, prod.count+1) }} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {prod.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>delCartItem(prod._id)} className="font-medium text-fg-danger hover:underline">Remove</span>
        </td>
      </tr>} )}
  
    </tbody>
  </table>
  <Button onClick={()=>{removeCart}} className='my-4 w-full'>Clear Cart</Button>
</div>
  </div>
  <div className="w-1/4 mt-5">
  <div className="border p-4">
    <h2 className='text-xl my-4'>Num of cart items <span className='text-xl text-green-400'>{cartData?.numOfCartItems ??0}</span></h2>
    <h2 className='text-xl '>Total price  <span className='text-xl text-green-400'>{cartData?.data.totalCartPrice} EGP</span></h2>


    <Link href={`/checkout/${cartData?.cartId}`}><Button className='my-4 cursor'>
      
      Check out</Button></Link>
      <div className="flex">
        <Button className='bg-green-400'>apply coupon</Button>
        <input className='w-full' type="text" placeholder='apply coupon' />
      
      </div>
        
    
  </div>
  
  </div>
</div>   :  <Image src={cartImg} alt='cart' width={400} height={400}/>}



  




  
  </>
}
