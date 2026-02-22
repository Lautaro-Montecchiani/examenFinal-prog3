import { motion } from 'framer-motion';
import { Users, Award, Briefcase, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            {/* Header Nosotros */}
            <header style={{ textAlign: 'center', margin: '6rem 0 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)'
                    }}
                >
                    Sobre Nosotros
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        lineHeight: '1.2',
                        marginBottom: '2rem',
                        background: 'linear-gradient(to right, #ffffff, #a0a0a0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800,
                        maxWidth: '900px'
                    }}
                >
                    Nos define nuestra pasión por transformar ideas en soluciones que generan un impacto real.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}
                >
                    Nuestro equipo es interdisciplinario y profesional para dar soluciones innovadoras a problemas cotidianos que limitan el potencial de las empresas.
                </motion.p>
            </header>

            {/* Mucho mas que un proveedor */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', marginBottom: '8rem', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>Mucho más que un proveedor de servicios.</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem' }}>
                        En AIDS somos mucho más que desarrolladores de software. Somos socios tecnológicos estratégicos de nuestros clientes y construimos relaciones de largo plazo.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem' }}>
                        Escuchamos para entender, diseñamos para transformar y desarrollamos soluciones digitales que impulsan el crecimiento de tu empresa. Cada proyecto es un desafío que abordamos con pasión, trabajando en equipo garantizando excelencia en cada etapa de nuestro proceso.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-panel"
                    style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', color: 'var(--primary-color)' }}>
                            <Zap size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Soluciones de Calidad</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Nuestro proceso certificado garantiza excelencia técnica.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', color: 'var(--primary-color)' }}>
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Enfoque Humano</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Ponemos a nuestros clientes en el centro del proceso colectivo.</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Como lo hacemos */}
            <section style={{ marginBottom: '8rem' }}>
                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>¿Cómo lo hacemos? En conjunto.</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
                        En nuestra forma de trabajar combinamos profesionalismo, experiencia técnica y un enfoque humano constante. Creemos que las mejores soluciones nacen de la colaboración: mientras aportamos conocimiento técnico, los clientes contribuyen con la experiencia sobre su negocio. Nuestro objetivo es construir relaciones cercanas basadas en confianza y mejora continua.
                    </p>
                </div>
            </section>

            {/* Estadisticas */}
            <section style={{ marginBottom: '8rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {[
                        { number: '+10', label: 'Años de experiencia', icon: <Briefcase size={28} /> },
                        { number: '+500', label: 'Clientes activos', icon: <Users size={28} /> },
                        { number: '+2000', label: 'Proyectos realizados', icon: <Award size={28} /> }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel"
                            style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                        >
                            <div style={{ color: 'var(--primary-color)', opacity: 0.8 }}>{stat.icon}</div>
                            <h3 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(180deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {stat.number}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ textAlign: 'center', padding: '0 2rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Trabajamos con grandes marcas.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Clientes de todo el mundo nos eligen como su socio tecnológico para potenciar su transformación digital.
                </p>
            </section>
        </div>
    );
}
