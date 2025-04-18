export interface Product {
    id: number
    name: string
    description: string
    category: string
    sellerName: string
    numberOfRatings: number
    ratingAverage: number
    price: number
    images: string[]
    discount: number
}

export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
}