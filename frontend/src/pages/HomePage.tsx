import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Artificial Intelligent<br />Digital Solutions
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}
                >
                    Premium digital products and developer tools designed to accelerate your workflow.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    <Link to="/catalog" className="btn-primary" style={{ display: 'inline-block', fontSize: '1.1rem' }}>
                        Explore Catalog
                    </Link>
                </motion.div>
            </header>

            <section className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                <h2>Empowering the Next Generation</h2>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Our tools integrate seamlessly with your architecture, ensuring scalability and performance from day one.</p>
            </section>
        </div>
    );
}
