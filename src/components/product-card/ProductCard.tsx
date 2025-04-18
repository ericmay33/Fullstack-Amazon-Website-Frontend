import StarRating from '../star-rating/StarRating.tsx'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'

export interface ProductCardProps {
    id: number
    name: string
    imageUrl: string
    ratingAverage: number
    price: number
}

export default function ProductCard(props: ProductCardProps) {
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
        </div>
    )
}