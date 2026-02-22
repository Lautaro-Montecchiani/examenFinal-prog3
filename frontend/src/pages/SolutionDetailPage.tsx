import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { solutionsData } from '../data/solutions';

export default function SolutionDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const solution = solutionsData.find(s => s.slug === slug);

    if (!solution) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Solución no encontrada</h1>
                <Link to="/soluciones" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={18} /> Volver a Soluciones
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <Link
                to="/soluciones"
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    color: 'var(--text-secondary)', marginBottom: '3rem', marginTop: '2rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
                <ArrowLeft size={18} /> Volver a Soluciones
            </Link>

            <header style={{ marginBottom: '6rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                        lineHeight: '1.2',
                        marginBottom: '1.5rem',
                        fontWeight: 800
                    }}
                >
                    {solution.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '800px', lineHeight: '1.7', marginBottom: '3rem' }}
                >
                    {solution.description}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <a href="mailto:contacto@aids.com" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '3rem' }}>
                        Contactar ventas
                    </a>
                </motion.div>
            </header>

            <section style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Beneficios para tu negocio</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {solution.benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '2rem' }}
                        >
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                                {benefit.title}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="glass-panel" style={{ padding: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Características Técnicas</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                    {solution.features.map((feature, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.5rem',
                            borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <CheckCircle2 size={18} color="var(--primary-color)" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
