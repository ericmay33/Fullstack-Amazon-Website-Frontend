import StarRating from '../star-rating/StarRating.tsx'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import { addItemToCart } from '../../utils/api.ts'
import { useNavigate } from 'react-router-dom'

export interface ProductCardProps {
    id: number
    name: string
    imageUrl: string
    ratingAverage: number
    price: number
    showAddButton: boolean
}

export default function ProductCard(props: ProductCardProps) {
    const navigate = useNavigate();

    async function handleAddToCart() {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            console.log('no token')
            navigate('/login');
            return;
        }

        try {
            console.log('send add request')
            await addItemToCart(token, props.id);
        } catch (err) {
            // Ignore errors
        }
    }

    return (
        <div className={styles['product-container']}>
            <div className={styles['product-image-container']}>
                <Link to={`/product/${props.id}`}>
                    <img className={styles['product-image']} src={props.imageUrl} alt={props.name} />
                </Link>
            </div>
            <Link className={styles['product-link']} to={`/product/${props.id}`}>
                <h2 className={styles['product-title']}>{props.name}</h2>
            </Link>
            <StarRating rating={props.ratingAverage} />
            <p>{`$${props.price.toFixed(2)}`}</p>
            {props.showAddButton && <button className={styles['cart-button']} onClick={ () => handleAddToCart() }>Add to Cart</button>}
        </div>
    )
}