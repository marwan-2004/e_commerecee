import { ProductItem } from '@/types/productsInterface'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductImg from './../../_components/productImg/ProductImg'
import AddBtn from './../../_components/addBtn/addBtn'

// IMPORTANT: params is now a Promise in Next.js 15+
type myProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Productdetails(props: myProps) {
  // AWAIT the params to get the id
  const { id } = await props.params
  
  console.log('Product ID from params:', id) // This should now show the ID

  try {
    if (!id) {
      throw new Error('Product ID is missing or undefined')
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const responseData = await response.json()
    console.log('API Response:', responseData)
    
    // Extract the product data correctly
    const singleProduct = responseData?.data

    if (!singleProduct) {
      return (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
        </div>
      )
    }

    return (
      <div className='grid md:grid-cols-3 gap-5 items-start'>
        {/* Product Images */}
        <div className='md:col-span-1'>
          <ProductImg images={singleProduct.images || []} />
        </div>

        {/* Product Details */}
        <div className='md:col-span-2'>
          <Card className="relative w-full pt-0 p-10">
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">
                  {singleProduct.brand?.name || 'No Brand'}
                </Badge>
              </CardAction>
              
              <CardTitle className="text-2xl">
                {singleProduct.title}
              </CardTitle>
              
              <CardDescription className="space-y-4 my-3">
                <p className="text-gray-600">{singleProduct.description}</p>
                
                {/* Category and Subcategory */}
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">{singleProduct.category?.name}</Badge>
                  {singleProduct.subcategory?.map((sub: any) => (
                    <Badge key={sub._id} variant="outline" className="bg-gray-50">
                      {sub.name}
                    </Badge>
                  ))}
                </div>
              </CardDescription>
              
              <CardDescription className="space-y-2 my-3">
                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <span className="text-sm text-gray-500">Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-green-600">
                        {singleProduct.price} EGP
                      </span>
                      {singleProduct.priceAfterDiscount && (
                        <span className="text-lg text-gray-400 line-through">
                          {singleProduct.priceAfterDiscount} EGP
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xl font-semibold">
                        {singleProduct.ratingsAverage}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({singleProduct.ratingsQuantity} reviews)
                    </span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Availability:</span>
                  <span className={singleProduct.quantity > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {singleProduct.quantity > 0 ? `${singleProduct.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            
            <div className="px-6 pb-6">
              <AddBtn productId={singleProduct._id} />
            </div>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Product</h2>
        <p className="text-gray-600 mb-2">Failed to load product details.</p>
        <p className="text-sm text-gray-500">Product ID: {id || 'Not provided'}</p>
      </div>
    )
  }
}