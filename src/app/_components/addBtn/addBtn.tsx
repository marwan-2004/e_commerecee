'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/servises/cart/add-prod-cart'
import { addtowishlist } from '@/servises/wishlist/add-prod-wishlist'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'




export default function AddBtn({productId}:{productId:string}) {
    const queryClient=  useQueryClient()



  const{data, isPending,error,isError,mutate:addProductToCart} = useMutation({
        mutationFn:addToCart ,
        onSuccess:(data)=>{
            toast.success(data?.message) 
            queryClient.invalidateQueries({queryKey:['get-cart']})
        } ,
        onError:()=>{
            toast.error('login first')
        }
    })

    const{data:wish,mutate:addProductToWish} = useMutation({
        mutationFn:addtowishlist ,
        onSuccess:(wish)=>{
            toast.success(wish?.message) 
            queryClient.invalidateQueries({queryKey:['get-wish']})
        } ,
        onError:()=>{
            toast.error('login first')
        }
    })

  return <>
  <CardFooter className="flex justify-between">
        <Button onClick={()=>{addProductToCart(productId)}}  className="">Add to cart </Button>

        <svg  onClick={()=>{addProductToWish(productId) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

      </CardFooter>
  
  </>
}
