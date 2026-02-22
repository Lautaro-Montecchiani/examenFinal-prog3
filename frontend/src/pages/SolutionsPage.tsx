import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Box, Code, Cpu, Globe, Layout, Palette, Zap } from 'lucide-react';
import { useSolutionsAdmin } from '../hooks/useSolutionsAdmin';
import './SolutionsPage.css';

const iconMap: Record<string, React.ReactNode> = {
    Box: <Box size={32} />,
    Code: <Code size={32} />,
    Cpu: <Cpu size={32} />,
    Globe: <Globe size={32} />,
    Layout: <Layout size={32} />,
    Palette: <Palette size={32} />,
    Zap: <Zap size={32} />
};

export default function SolutionsPage() {
    const { solutions } = useSolutionsAdmin();
    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <header style={{ textAlign: 'center', margin: '6rem 0 4rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        display: 'inline-flex',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '1.5rem',
                        color: 'var(--primary-color)'
                    }}
                >
                    <Sparkles size={18} style={{ marginRight: '0.5rem' }} /> Casos de Éxito
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem' }}
                >
                    Nuestras Soluciones
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
                >
                    Herramientas comprobadas e implementaciones avanzadas que ya están revolucionando la arquitectura de nuestros clientes.
                </motion.p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {solutionsData.map((sol, i) => (
                    <motion.div
                        key={sol.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.3' }}>{sol.title}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6' }}>
                            {sol.summary}
                        </p>
                        <Link
                            to={`/soluciones/${sol.slug}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                color: 'var(--primary-color)', fontWeight: 'bold'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                        >
                            Ver caso completo <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
