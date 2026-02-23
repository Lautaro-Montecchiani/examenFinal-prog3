import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInvoicesAdmin, Invoice } from '../hooks/useInvoicesAdmin';
import { CheckCircle, AlertTriangle, ArrowLeft, Lock, FileText } from 'lucide-react';
import './PaymentCheckoutPage.css';

const PaymentCheckoutPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getInvoiceById, updateInvoiceStatus } = useInvoicesAdmin();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);

    useEffect(() => {
        // Simulate a small network delay for realism
        setTimeout(() => {
            if (id) {
                const found = getInvoiceById(id);
                setInvoice(found || null);
            }
            setIsLoading(false);
        }, 800);
    }, [id, getInvoiceById]);

    const handleMockPayment = (method: 'mercadopago' | 'paypal') => {
        setIsSimulatingPayment(true);
        // Simulate external gateway processing
        setTimeout(() => {
            if (invoice) {
                updateInvoiceStatus(invoice.id, 'PAID');
                setInvoice({ ...invoice, status: 'PAID' });
            }
            setIsSimulatingPayment(false);
        }, 2000);
    };

    if (isLoading) {
        return (
            <div className="checkout-loading">
                <div className="spinner"></div>
                <h2>Buscando detalles de pago...</h2>
                <p>Por favor espera un momento.</p>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="checkout-error">
                <AlertTriangle size={64} color="#ef4444" />
                <h2>Factura no encontrada</h2>
                <p>El código <strong>{id}</strong> no existe o ha caducado en nuestro sistema.</p>
                <Link to="/pagos" className="btn btn-primary mt-4">
                    <ArrowLeft size={18} /> Volver al buscador
                </Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-header">
                    <Link to="/pagos" className="back-link">
                        <ArrowLeft size={18} /> Volver
                    </Link>
                    <h1>Checkout de Servicio</h1>
                </div>

                <div className="checkout-grid">
                    {/* Resumen de la Factura */}
                    <div className="checkout-summary">
                        <div className="summary-card">
                            <div className="summary-header">
                                <FileText size={24} />
                                <h3>Resumen de Factura</h3>
                            </div>

                            <div className="summary-body">
                                <div className="detail-row">
                                    <span>Cliente:</span>
                                    <strong>{invoice.clientName}</strong>
                                </div>
                                <div className="detail-row">
                                    <span>Referencia:</span>
                                    <strong>{invoice.id}</strong>
                                </div>
                                <div className="detail-row">
                                    <span>Concepto:</span>
                                    <p className="service-desc">{invoice.serviceDesc}</p>
                                </div>
                                <div className="detail-row">
                                    <span>Vencimiento:</span>
                                    <strong>{new Date(invoice.dueDate).toLocaleDateString('es-AR')}</strong>
                                </div>
                            </div>

                            <div className="summary-footer">
                                <span>Total a pagar</span>
                                <div className="total-amount">
                                    {invoice.currency} ${invoice.amount.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="secure-badge">
                            <Lock size={16} /> Pago seguro con encriptación SSL de 256 bits.
                        </div>
                    </div>

                    {/* Área de Pago */}
                    <div className="checkout-payment-area">
                        {invoice.status === 'PAID' ? (
                            <div className="payment-success-card">
                                <CheckCircle size={64} className="success-icon" />
                                <h2>¡Pago Aprobado!</h2>
                                <p>El abono de tu servicio mensual fue procesado correctamente. En breve recibirás la factura oficial tipo A/C por correo electrónico.</p>

                                <div className="receipt-details">
                                    <span>Comprobante automático:</span>
                                    <strong>#RCPT-{Math.random().toString(36).substr(2, 8).toUpperCase()}</strong>
                                </div>

                                <Link to="/" className="btn btn-outline" style={{ marginTop: '2rem' }}>
                                    Volver al inicio
                                </Link>
                            </div>
                        ) : (
                            <div className="payment-methods-card">
                                <h2>Seleccionar Medio de Pago</h2>
                                <p>Elegí la plataforma de pago que mejor se adapte a vos. El procesamiento es inmediato.</p>

                                {isSimulatingPayment ? (
                                    <div className="processing-payment">
                                        <div className="spinner"></div>
                                        <h3>Conectando con la pasarela...</h3>
                                        <p>No cierres esta ventana.</p>
                                    </div>
                                ) : (
                                    <div className="payment-options">
                                        <button
                                            className="mp-btn"
                                            onClick={() => handleMockPayment('mercadopago')}
                                        >
                                            <img src="https://logospng.org/download/mercado-pago/logo-mercado-pago-icone-1024.png" alt="Mercado Pago" className="mp-logo" />
                                            Pagar con MercadoPago
                                        </button>

                                        <div className="divider">
                                            <span>Ó pagos internacionales</span>
                                        </div>

                                        <button
                                            className="paypal-btn"
                                            onClick={() => handleMockPayment('paypal')}
                                        >
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="paypal-logo" />
                                            Pay with PayPal
                                        </button>

                                        <div className="crypto-notice">
                                            *Para pagar con USDT (vía Binance Pay o Airtm), por favor contactá a tu account manager.
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckoutPage;
