import { Brand } from '@/types/productsInterface'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  params: { id: string }
}

export default async function Branddetails({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${params.id}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    return <p>Failed to fetch brand ({response.status})</p>
  }

  const json = await response.json()

  if (json.status !== "success") {
    return <p>Brand not found</p>
  }

  const singleBrand = json.data

  return (
    <div>
      <img src={singleBrand.image} alt={singleBrand.name} />
      <h1>{singleBrand.name}</h1>
    </div>
  )
}

