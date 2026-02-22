import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { processCheckout, CheckoutData } from '../api/checkout';

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        telephone: '',
        payment_type: 'card'
    });

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const checkoutData: CheckoutData = {
            client: {
                name: formData.name,
                lastname: formData.lastname,
                email: formData.email,
                telephone: formData.telephone
            },
            bill: {
                bill_number: `INV-${Date.now()}`,
                discount: 0,
                payment_type: formData.payment_type
            },
            items: cartItems.map(i => ({ product_id: i.id, quantity: i.quantity, price: i.price })),
            total
        };

        try {
            await processCheckout(checkoutData);
            setSuccess(true);
            clearCart();
        } catch (err: any) {
            setError(err.message || 'Error processing checkout');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
                    <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 2rem' }} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem' }}>
                        Your artificial tools are being provisioned. Check your email for further instructions.
                    </p>
                    <Link to="/catalog" className="btn-primary">Return to Catalog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Your cart is empty</h2>
                    <Link to="/catalog" className="btn-primary">Browse Services</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Order Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <div style={{ color: 'var(--text-secondary)' }}>Qty: {item.quantity}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>${(item.price * item.quantity).toFixed(2)}</div>
                                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#f87171', padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Payment Information</h2>

                        <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>First Name</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Last Name</label>
                                    <input required name="lastname" value={formData.lastname} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Telephone</label>
                                <input required name="telephone" value={formData.telephone} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Payment Method</label>
                                <select name="payment_type" value={formData.payment_type} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', color: 'white' }}>
                                    <option value="card" style={{ color: 'black' }}>Credit Card</option>
                                    <option value="cash" style={{ color: 'black' }}>Cash / Wire Transfer</option>
                                </select>
                            </div>

                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {error && <div style={{ color: '#f87171', padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', borderRadius: '0.5rem', fontSize: '0.9rem' }}>{error}</div>}

                            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Processing...' : 'Complete Purchase'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
