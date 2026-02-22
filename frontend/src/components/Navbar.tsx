import { Link } from 'react-router-dom';
import { ShoppingCart, Hexagon } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                <Hexagon color="var(--accent-primary)" size={28} />
                <span>AIDS</span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/catalog">Catalog</Link>
                <Link to="/cart" style={{ position: 'relative' }}>
                    <ShoppingCart size={24} />
                    {itemCount > 0 && (
                        <span style={{
                            position: 'absolute', top: '-8px', right: '-8px',
                            background: 'var(--accent-primary)', color: 'white',
                            borderRadius: '50%', width: '20px', height: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 'bold'
                        }}>
                            {itemCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
