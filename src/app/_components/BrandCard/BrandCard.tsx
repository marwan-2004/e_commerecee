import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Brand, ProductItem } from "@/types/productsInterface"
import  Link  from 'next/link';
import AddBtn from "../addBtn/addBtn";


export function BrandCard({brand}:{brand : Brand}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      
      <Link href={`/branddetails/${brand._id}`} className="block">
  <div>
    <img
      src={brand.image}
      alt={brand.name}
      className="w-full"
    />

    <CardHeader>
      <CardAction>
        <Badge variant="secondary">{brand.name}</Badge>
      </CardAction>

      <CardTitle>
        {brand.name.split(' ').slice(0, 2).join(' ')}
      </CardTitle>
    </CardHeader>
  </div>
</Link>

      
      
    </Card>
  )
}
