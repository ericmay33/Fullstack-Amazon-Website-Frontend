import { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { Product } from '../utils/types'
import { getCart } from '../utils/api'
import ProductCard from '../components/product-card/ProductCard'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [products, setProducts] = useState([] as Product[]);

    const token = localStorage.getItem('TOKEN') as string;
    const navigate = useNavigate();

    async function loadCartProducts() {
        const productApiData = await getCart(token);
        setProducts(productApiData);
    }

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            document.title = "Cart"
            loadCartProducts();
        }
    }, []);

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
                    showAddButton={false}
                />
            )
        })
    }

    if (products.length === 0) {
        return (
            <div className={styles['main-container']}>
                <h1>Cart</h1>
                <h2>Your cart is empty.</h2>
            </div>
        );
    } else {
        return (
            <div className={styles['main-container']}>
                <h1>Cart</h1>
                {products.length === 0}
                <div className={styles['cart-list']}>
                    { createProductCards() }
                </div>
            </div>
        )
    }
}