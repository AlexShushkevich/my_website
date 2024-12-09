const ProductCard = ({ product, addToCart }) => (
    <div className="card product-card">
        {product.image && (
            <img src={product.image} alt={product.name} className="card-img-top product-image" />
        )}
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">
                <strong>{product.price} руб.</strong>
            </p>
            <button
                onClick={() => addToCart(product.id)}
                className="btn btn-primary add-to-cart-btn"
            >
                Добавить в корзину
            </button>
        </div>
    </div>
);

export default ProductCard;

