import axios from 'axios'
import { Product, User } from './types'

const BACKEND_URL = 'http://localhost:3000'

export async function getProducts(): Promise<Product[]> {
    const response = await axios.get(`${BACKEND_URL}/products`)
    return response.data
}

export async function getProductById(id: number): Promise<Product> {
    const response = await axios.get(`${BACKEND_URL}/products/${id}`)
    return response.data
}

export async function login(username: string, password: string): Promise<string> {
    const response = await axios.post(`${BACKEND_URL}/login`, { username, password})
    return response.data.token
}

export async function getUser(token: string): Promise<User> {
    const response = await axios.get(`${BACKEND_URL}/user`, { headers: { token }})
    return response.data
}

export async function getCart(token: string): Promise<Product[]> {
    const response = await axios.get(`${BACKEND_URL}/cart`, { headers: { token }})
    return response.data
}

export async function addItemToCart(token: string, productId: number): Promise<string> {
    const response = await axios.post(`${BACKEND_URL}/cart`, { productId: productId }, { headers: { token }})
    return response.data
}
