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
import { deleteWishItem } from '@/servises/wishlist/delete-wish-item'

export default function Wishlist() {
  const queryClient=  useQueryClient()
  const{data:wishData ,isLoading,isError } =useQuery<CartResponse>({
    queryKey:['get-wishlist'],
    queryFn:async()=>{
      const resp=await fetch('/api/wishlist') 
      const payload=await resp.json()
      return payload
    }
  })



  





  //delete wishlist
  const {mutate:delCartItem , isPending }= useMutation({
    mutationFn:deleteWishItem ,
    onSuccess:()=>{
      toast.success('item deleted')
      queryClient.invalidateQueries({queryKey:['get-wishlist']})
    } ,
    onError:()=>{
      toast.error('error')

    }

  })








 

  if(isError){return <h2>error</h2>}
  if(isLoading){return <h2>loading</h2>}


  return <>
<h2>wishlist</h2>
{/* 
  {wishData?. > 0 ? <div className="flex gap-5">
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
      {wishData?.data.products.map((prod)=>{ return <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
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
              
              <span  id="counter-input-1" data-input-counter className="shrink-0 mx-3 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"  >
                {prod.count}
              </span>
              
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
  
</div>
  </div>
  <div className="w-1/4 mt-5">
  <div className="border p-4">
    <h2 className='text-xl my-4'>Num of cart items <span className='text-xl text-green-400'>{wishData?.numOfCartItems}</span></h2>
    <h2 className='text-xl '>Total price  <span className='text-xl text-green-400'>{wishData?.data.totalCartPrice} EGP</span></h2>


    <Link href={`/checkout/${wishData?.cartId}`}><Button className='my-4 cursor'>
      
      Check out</Button></Link>
    
  </div>
  
  </div>
</div>   :  <Image src={cartImg} alt='cart' width={400} height={400}/>}



  
 */}



  
  </>
}
