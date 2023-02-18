import { Category } from './category'

export class Product {
    id?: string
    name?: string
    image?: string
    brand?: string
    price?: number
    rating?: number
    numReviews?: number
    isFeatured?: boolean
    description?: string
    category?: Category
    countInStock?: number
    richDescription?: string
    images?: string[]
    dateCreated?: string
}
