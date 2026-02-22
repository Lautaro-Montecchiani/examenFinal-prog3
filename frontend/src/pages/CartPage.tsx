import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, removeFromCart } = useCart();
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Your cart is empty</h2>
                    <Link to="/catalog" className="btn-primary">Browse Services</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '3rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <div style={{ color: 'var(--text-secondary)' }}>Qty: {item.quantity}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>${(item.price * item.quantity).toFixed(2)}</div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#f87171', padding: '0.5rem' }}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Summary</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            <span>Taxes</span>
                            <span>$0.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                            Complete Purchase
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
