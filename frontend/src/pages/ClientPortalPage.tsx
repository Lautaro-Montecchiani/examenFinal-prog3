import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CreditCard, ShieldCheck, Zap } from 'lucide-react';
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
                    <h1 className="display-title">Portal de <span>Cobranzas B2B</span></h1>
                    <p className="subtitle">
                        Pagá tus servicios digitales y mantenimiento técnico de forma rápida, segura y desde cualquier lugar del mundo.
                    </p>
                </div>
            </section>

            <section className="portal-content">
                <div className="container">
                    <div className="portal-grid">

                        {/* Left Column: Search Form */}
                        <div className="portal-search-card">
                            <div className="card-icon">
                                <Search size={32} />
                            </div>
                            <h2>Buscar y Pagar Factura</h2>
                            <p>Ingresá el código de referencia que te enviamos por correo electrónico para acceder al detalle de tu cuenta.</p>

                            <form onSubmit={handleSearch} className="portal-form">
                                <div className="form-group">
                                    <label htmlFor="invoiceId">Código de Pago (Ej. INV-AIDS-XXXX)</label>
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
                                    Consultar Factura
                                </button>
                            </form>
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
