import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

export default function Navbar() {
    return (
        <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                <Hexagon color="var(--accent-primary)" size={28} />
                <span>AIDS</span>
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/soluciones">Soluciones</Link>
            </div>
        </nav>
    );
}
