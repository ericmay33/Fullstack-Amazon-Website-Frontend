import { useNavigate, useParams } from 'react-router-dom'
import styles from './Product.module.css'
import type { Product } from '../utils/types'
import { useEffect, useState } from 'react'
import { getProductById } from '../utils/api'
import StarRating from '../components/star-rating/StarRating'
import LoadingSpinner from '../components/loading-spinner/LoadingSpinner'
import { wait } from '../utils/utils'
import ImagePreviewTool from '../components/image-preview-tool/ImagePreviewTool'

export default function Product() {
    const idParam = useParams().id!
    const id = parseInt(idParam, 10);
    const navigate = useNavigate()

    const [product, setProduct] = useState<Product | null>(null)

    async function loadProduct() {
        try {
            const productApiData = await getProductById(id)
            await wait(500) // purposefully delay loading for 500ms (one half of a second) so user can see the loading spinner
            setProduct(productApiData)
            document.title = productApiData.name
        }
        catch(err) {
            navigate('/')
        }
    }

    useEffect(() => {
        loadProduct()
    }, [])

    function createPrice(product: Product) {
        if (product.discount === 0) {
            return <p className={styles.price}>{ `$${product.price.toFixed(2)}` }</p>
        }
        const discountedPrice = product.price - (product.price * (product.discount / 100))
        return (
            <p><span className={styles['discount']}>{`$${product.price.toFixed(2)}`}</span>{`$${discountedPrice.toFixed(2)}`}</p>
        )
    }

    if (!product) {
        return(
            <LoadingSpinner />
        )
    }

    return (
        <div className={`${styles.flex} ${styles['flex-justify-center']}`}>
            <div className={styles['main-container']}>
                <ImagePreviewTool imageUrls={product.images} />
                <div className={styles['product-info-container']}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.seller}>{product.sellerName}</p>
                    <div className={styles['rating-container']}>
                        <p className={styles['rating-label']}>{product.ratingAverage.toFixed(1)}</p>
                        <StarRating rating={product.ratingAverage} />
                        <p className={styles['rating-label']}>{`(${product.numberOfRatings} Ratings)`}</p>
                    </div>
                    <p>{product.description}</p>
                    { createPrice(product) }
                </div>
            </div>
        </div>
    )
}