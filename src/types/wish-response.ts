export interface WishResponse {
  count: number
  data: {
    _id: string
    products: WishProduct[]
  }
}

export interface WishProduct {
  _id: string
  title: string
  price: number
  imageCover: string
}
