import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import './ClientPortalPage.css';

const ClientPortalPage = () => {
    const [invoiceId, setInvoiceId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!invoiceId.trim()) {
            setError('Por favor ingresá un código válido');
            return;
        }

        // Clean UI formatting (allow them to type lower case without INV-AIDS if they want to)
        let formattedId = invoiceId.trim().toUpperCase();
        if (!formattedId.startsWith('INV-')) {
            // Optional UX enhancement: if they just typed the 4 letters
            setError('El formato del código no es válido. Debe comenzar con INV-');
            return;
        }

        setError('');
        // Navigate to the checkout page with the ID
        navigate(`/pagos/${formattedId}`);
    };

    return (
        <div className="portal-page">
            <section className="portal-header">
                <div className="container">
                    <div style={{ height: '2rem' }}></div>
                </div>
            </section>

            <section className="portal-content">
                <div className="container">
                    <div className="portal-grid">

                        {/* Left Column: Search Form */}
                        <div className="portal-search-card">
                            <div className="card-icon">
                                <LogIn size={32} />
                            </div>
                            <h2>Acceso a Clientes B2B</h2>
                            <p>Iniciá sesión de forma segura para revisar y abonar tus facturas pendientes.</p>

                            <form onSubmit={handleSearch} className="portal-form">
                                <div className="form-group">
                                    <label htmlFor="clientEmail">Email Corporativo</label>
                                    <input
                                        type="email"
                                        id="clientEmail"
                                        placeholder="ejemplo@tuempresa.com"
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="invoiceId">Código de Acceso (Ej. INV-AIDS)</label>
                                    <input
                                        type="text"
                                        id="invoiceId"
                                        value={invoiceId}
                                        onChange={(e) => {
                                            setInvoiceId(e.target.value);
                                            setError('');
                                        }}
                                        placeholder="INV-AIDS-XXXX"
                                        className={error ? 'input-error' : ''}
                                        autoComplete="off"
                                    />
                                    {error && <span className="error-message">{error}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary portal-btn">
                                    Ingresar a mi cuenta
                                </button>
                            </form>

                            <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid #eaeaea', paddingTop: '1rem' }}>
                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>¿Sos parte del equipo de AIDS?</p>
                                <a href="/admin/login" style={{ fontSize: '0.9rem', color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>
                                    Acceso Administrador &rarr;
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Features/Trust Badges */}
                        <div className="portal-features">
                            <h3>¿Por qué usar nuestro portal?</h3>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h4>Múltiples Medios de Pago</h4>
                                    <p>Aceptamos Mercado Pago, tarjetas locales, transferencias internacionales Vía PayPal y stablecoins vía Airtm.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4>Pagos 100% Seguros</h4>
                                    <p>Operamos mediante pasarelas con encriptación bancaria regulada. Nosotros no guardamos datos de tus tarjetas.</p>
                                </div>
                            </div>

                            <div className="feature-item">
                                <div className="feature-icon">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <h4>Acreditación Instantánea</h4>
                                    <p>Tus abonos de mantenimiento e integraciones IA se activan inmediatamente una vez detectado el pago.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientPortalPage;
