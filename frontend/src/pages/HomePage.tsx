import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Cpu, Globe, Layout, Palette, Zap, ArrowRight, Star } from 'lucide-react';
import { useSolutionsAdmin } from '../hooks/useSolutionsAdmin';
import './HomePage.css';

export default function HomePage() {
    const { solutions } = useSolutionsAdmin();

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <header style={{ textAlign: 'center', margin: '6rem 0 8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '2rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)'
                    }}
                >
                    Innovación y Soluciones Digitales
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #ffffff, #a0a0a0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800
                    }}
                >
                    Diseñamos, desarrollamos<br />y mejoramos.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}
                >
                    Con más de 15 años de experiencia, ofrecemos consultoría y desarrollo tecnológico para potenciar tu negocio con herramientas digitales, automatizaciones y plataformas premium.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{ display: 'flex', gap: '1rem' }}
                >
                    <Link to="/soluciones" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Ver Soluciones <ArrowRight size={20} />
                    </Link>
                    <a href="#soluciones" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        Conocer más
                    </a>
                </motion.div>
            </header>

            {/* Marcas / Trust Section */}
            <section style={{ textAlign: 'center', marginBottom: '8rem', opacity: 0.7 }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
                    Trabajamos con grandes marcas internacionales y startups
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', filter: 'grayscale(100%)', opacity: 0.6 }}>
                    {/* Placeholder para logos de empresas */}
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Company A</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BRAND™</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Startup X</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Global Corp</div>
                </div>
            </section>

            {/* Servicios y Soluciones */}
            <section id="soluciones" style={{ marginBottom: '8rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Soluciones Digitales Integrales</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Transformamos ideas en plataformas escalables, integrando diseño de clase mundial con ingeniería de software robusta.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <Layout size={32} />, title: 'Diseño UX/UI Premium', desc: 'Interfaces modernas y centradas en el usuario con glassmorphism y diseño oscuro.' },
                        { icon: <Code size={32} />, title: 'Desarrollo Web & Móvil', desc: 'Aplicaciones escalables con React, Next.js, FastAPI y bases de datos relacionales.' },
                        { icon: <Cpu size={32} />, title: 'Inteligencia Artificial', desc: 'Integración de modelos de lenguaje, automatización de flujos y machine learning.' },
                        { icon: <Zap size={32} />, title: 'Performance Extrema', desc: 'Optimización de velocidad, SEO técnico y despliegues en infraestructura cloud.' },
                        { icon: <Palette size={32} />, title: 'Sistemas de Diseño', desc: 'Creación de librerías de componentes consistentes para acelerar el desarrollo.' },
                        { icon: <Globe size={32} />, title: 'Consultoría Cloud', desc: 'Arquitecturas distribuidas, Docker, Kubernetes y CI/CD pipelines.' },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ color: 'var(--primary-color)', background: 'rgba(255,255,255,0.05)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.3rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonios */}
            <section style={{ marginBottom: '8rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lo que dicen nuestros clientes</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {[
                        { name: 'Martín S.', role: 'CTO en Fintech', text: 'El equipo de AIDS transformó por completo nuestra plataforma. La velocidad y la calidad del código son inmejorables. El rediseño UX aumentó nuestra conversión un 40%.' },
                        { name: 'Lucía M.', role: 'Founder de SaaS', text: 'Entendieron nuestra visión desde el día uno. No solo entregaron el producto a tiempo, sino que sugirieron mejoras arquitectónicas vitales para nuestro crecimiento.' }
                    ].map((testi, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '3rem', position: 'relative' }}>
                            <div style={{ color: '#fbbf24', display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                                {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={20} />)}
                            </div>
                            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>"{testi.text}"</p>
                            <div>
                                <h4 style={{ fontSize: '1.1rem' }}>{testi.name}</h4>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{testi.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Final */}
            <section className="glass-panel" style={{ padding: '5rem 2rem', textAlign: 'center', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>¿Listo para el siguiente nivel?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Agenda una llamada o revisa nuestros casos de éxito para ver cómo transformamos negocios.
                </p>
                <Link to="/soluciones" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '3rem' }}>
                    Ver Casos de Éxito
                </Link>
            </section>
        </div>
    );
}
