const ProductCard = ({ product, addToCart }) => (
    <div className="card">
        {product.image && <img src={product.image} alt={product.name} className="card-img-top" />}
        <div className="card-body">
            <h5 className="card-title" style={{ fontSize: '1rem' }}>{product.name}</h5> {/* Уменьшаем размер шрифта */}
            <p className="card-text">
                <strong style={{ fontSize: '1.0rem' }}>{product.price} руб.</strong> {/* Увеличиваем размер шрифта */}
            </p>
            <button onClick={addToCart} className="btn btn-primary">Добавить в корзину</button>
        </div>
    </div>
);

export default ProductCard;






