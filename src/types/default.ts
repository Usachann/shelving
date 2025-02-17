export interface Material {
  id: number
  name: string
}

export interface Item {
  id: string
  name: string
  code: string | null
  price: Price
  image: Image
  material: number
}

type Price = {
  old_price: number | null
  current_price: number
}

type Image = {
  url: string
}
