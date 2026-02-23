import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        }, 1500);
    };

    return (
        <div className="contact-page">
            <section className="contact-header">
                <div className="container">
                    <h1 className="display-title">Empecemos a <span>conversar</span></h1>
                    <p className="subtitle">
                        Contanos sobre tu proyecto o los desafíos de tu empresa. Nuestro equipo de especialistas en IA y e-commerce headless está listo para ayudarte.
                    </p>
                </div>
            </section>

            <section className="contact-content">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h2>Información de <span>Contacto</span></h2>
                            <p className="contact-desc">
                                En AIDS (Artificial Intelligent Digital Solutions) creemos en construir relaciones a largo plazo basadas en la innovación constante y resultados medibles.
                            </p>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M22 16.92V21A2 2 0 0119.92 23A19.86 19.86 0 011 4.08 2 2 0 013 2H7.1A2 2 0 019 3.72A11 11 0 0010.15 7a2 2 0 01-.15 2.15l-2.07 2.07A16 16 0 0014.85 18l2.07-2.07A2 2 0 0119.05 15.83A11 11 0 0022 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Llamanos</h3>
                                        <p>+54 (11) 1234-5678</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>contacto@aids.com</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3>Oficinas</h3>
                                        <p>Mendoza, Argentina</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ej. Jorge Salvio"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Correo electrónico profesional</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="jorge@correo.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="company">Empresa u Organización</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Nombre de tu empresa"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">¿En qué podemos ayudarte?</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Contanos sobre tus objetivos, el volumen de tu e-commerce o los procesos que te gustaría automatizar."
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                    {!isSubmitting && (
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="form-success">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>¡Gracias por tu mensaje! Nos contactaremos a la brevedad.</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
