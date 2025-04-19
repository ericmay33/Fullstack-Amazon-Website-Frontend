import { useEffect, useState } from 'react'
import styles from './Browse.module.css'
import { Product } from '../utils/types'
import { getProducts } from '../utils/api'
import ProductCard from '../components/product-card/ProductCard'

export default function Browse() {
    const [products, setProducts] = useState([] as Product[])

    async function loadProducts() {
        const productApiData = await getProducts()
        setProducts(productApiData)
    }

    useEffect(() => {
        document.title = "Browse Products"
        loadProducts()
    }, [])

    function createProductCards() {
        return products.map(product => {
            return (
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.images[0]}
                    ratingAverage={product.ratingAverage}
                    price={product.price}
                    showAddButton={true}
                />
            )
        })
    }

    return (
        <div className={styles['main-container']}>
            <h1>Browse Products</h1>
            <p className={styles['number-of-shop-items']}>Number of items: <span>{products.length}</span></p>
            <p>Check each product page for other buying options. Price and other details may vary based on product size and color.</p>
            <div className={styles['product-list']}>
                { createProductCards() }
            </div>
        </div>
    )
}