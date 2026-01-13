import './ProductCard.css'

const ProductCard = ( { product = {} } ) => {
    return (
        <div className="product-card">
            <h2 className="product-name" style={product.price > 1000 ? { color: 'green' } : { color: 'white' }}>{product.name}</h2>
            <p className="product-price">₹{product.price}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-rating">Rating: {product.rating}</p>
            {product.stock ? <p className="stock-status in-stock">In Stock</p> : <p className="stock-status out-of-stock">Out of Stock</p>}
            {product.discount > 0 && <p className="discount-badge">Discount: {product.discount}%</p>}
            {product.rating >= 4.5 && <p className="rating-badge">Excellent</p>}
            {product.rating >= 4.0 && product.rating < 4.5 && <p className="rating-badge">Good</p>}
            {product.rating < 4 && <p className="rating-badge">Average</p>}
        </div>
    )
}

export default ProductCard
