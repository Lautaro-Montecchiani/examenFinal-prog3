import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Loading product details...</div>;
    if (!product) return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>Product not found.</div>;

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <Link to="/catalog" style={{ color: 'var(--accent-primary)', display: 'inline-block', marginBottom: '2rem' }}>&larr; Back to Catalog</Link>
            <div className="glass-panel" style={{ padding: '3rem', display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '1rem' }}>
                        {product.category?.name || 'Service'}
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                        A premium digital solution to optimize your architecture and boost productivity.
                        {/* The backend does not supply a description field on the product model right now, so utilizing a generic copy */}
                    </p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem', width: '350px', flexShrink: 0, background: 'rgba(0,0,0,0.5)' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                        ${product.price?.toFixed(2)}
                    </div>
                    <div style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        {product.stock > 0 ? (
                            <span style={{ color: '#4ade80' }}>Available for Immediate Delivery</span>
                        ) : (
                            <span style={{ color: '#f87171' }}>Currently Out of Stock</span>
                        )}
                    </div>
                    <button
                        className="btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', padding: '1rem' }}
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        <ShoppingCart size={20} />
                        {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
}
