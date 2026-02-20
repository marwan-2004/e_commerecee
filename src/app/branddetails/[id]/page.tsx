import { Brand, ProductItem } from '@/types/productsInterface'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import Image from 'next/image'
import { ProductCard } from '@/app/_components/ProductCard/ProductCard' // Adjust the import path

type Props = {
  params: Promise<{ id: string }>
}

export default async function Branddetails({ params }: Props) {
  const { id } = await params

  try {
    // Fetch brand details
    const brandResponse = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      { 
        cache: "no-store",
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    if (!brandResponse.ok) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Error Loading Brand
          </h2>
          <p className="text-gray-600">Status: {brandResponse.status}</p>
        </div>
      )
    }

    const brandJson = await brandResponse.json()
    
    if (!brandJson.data) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500">Brand not found</p>
          <p className="text-sm text-gray-500">Brand ID: {id}</p>
        </div>
      )
    }

    const brand = brandJson.data

    // Fetch all products
    const productsResponse = await fetch(
      'https://ecommerce.routemisr.com/api/v1/products',
      { 
        cache: "no-store",
        headers: {
          'Accept': 'application/json',
        }
      }
    )

    const productsJson = await productsResponse.json()
    
    // Filter products by brand ID
    const brandProducts = productsJson.data.filter(
      (product: ProductItem) => product.brand?._id === id
    )

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Brand Header Card */}
          <Card className="max-w-2xl mx-auto overflow-hidden mb-8">
            <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-40 h-40 bg-white rounded-full p-4 shadow-lg">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-2"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>
            
            <CardHeader className="text-center pt-16">
              <CardAction className="flex justify-center">
                <Badge variant="secondary" className="px-4 py-1">
                  Brand
                </Badge>
              </CardAction>
              <CardTitle className="text-3xl font-bold mt-4">
                {brand.name}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {brand.slug}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Products Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">
              {brand.name} Products ({brandProducts.length})
            </h2>
            
            {brandProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No products found for this brand</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                {brandProducts.map((product: ProductItem) => (
                  <ProductCard key={product._id} prod={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Error Loading Brand
        </h2>
        <p className="text-gray-600">Failed to load brand details</p>
      </div>
    )
  }
}