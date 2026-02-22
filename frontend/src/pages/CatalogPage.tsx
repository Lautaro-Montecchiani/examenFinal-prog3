import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CatalogPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Here, we would fetch from the real backend endpoint.
    useEffect(() => {
        fetch('http://127.0.0.1:8000/products?limit=10')
            .then(res => res.json())
            .then(data => {
                setServices(data.items || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Digital Services</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Explore our catalog of AI and Developer solutions</p>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>Loading specialized products...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {services.map((svc, i) => (
                        <motion.div
                            key={svc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel"
                            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ padding: '2rem', flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    {svc.category?.name || 'Service'}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{svc.name}</h3>
                                <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>${svc.price?.toFixed(2)}</div>
                            </div>
                            <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                                <Link to={`/product/${svc.id}`} className="btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                    {services.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                            No services found in the database.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
