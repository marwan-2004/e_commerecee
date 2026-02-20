'use client'

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Image from 'next/image'
import cartImg from '../../assets/images/cart.webp'

import { deleteWishItem } from '@/servises/wishlist/delete-wish-item'


interface WishlistResponse {
  status: string
  count: number
  data: Array<{
    _id: string
    title: string
    price: number
    imageCover: string
    
  }>
}

export default function Wishlist() {
  const queryClient = useQueryClient()


  // GET WISHLIST
 
  const {
    data: wishData,
    isLoading,
    isError,
  } = useQuery<WishlistResponse>({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const resp = await fetch('/api/wishlist', {
        cache: 'no-store',
      })

      if (!resp.ok) {
        throw new Error('Failed to load wishlist')
      }

      return resp.json()
    },
  })
  
  console.log('Wishlist Data:', wishData) 

  
  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: deleteWishItem,
    onSuccess: () => {
      toast.success('Item removed from wishlist')
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => {
      toast.error('Failed to remove item')
    },
  })

  
  if (isLoading) return <h2 className="text-center">Loading...</h2>
  if (isError) return <h2 className="text-center text-red-500">Error loading wishlist</h2>

 
  if (!wishData || wishData?.count === 0 || wishData?.data?.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <Image src={cartImg} alt="Empty wishlist" width={400} height={400} />
      </div>
    )
  }

  
  return (
    <div className="flex gap-5 mt-5">
      <div className="w-full">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-sm bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              
              {wishData?.data?.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={product?.imageCover}
                      alt={product?.title}
                      className="w-20 rounded"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {product?.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    {product?.price} EGP
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteItem(product._id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}