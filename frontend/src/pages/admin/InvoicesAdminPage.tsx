import React, { useState } from 'react';
import { useInvoicesAdmin, Invoice } from '../../hooks/useInvoicesAdmin';
import { FileText, Plus, Trash2, CheckCircle, Copy, Clock } from 'lucide-react';
import './AdminCRUDParams.css';

const InvoicesAdminPage = () => {
    const { invoices, addInvoice, updateInvoiceStatus, deleteInvoice } = useInvoicesAdmin();
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        clientName: '',
        serviceDesc: '',
        amount: '',
        currency: 'USD' as 'USD' | 'ARS',
        dueDate: ''
    });

    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addInvoice({
            clientName: formData.clientName,
            serviceDesc: formData.serviceDesc,
            amount: Number(formData.amount),
            currency: formData.currency,
            dueDate: formData.dueDate
        });

        setFormData({ clientName: '', serviceDesc: '', amount: '', currency: 'USD', dueDate: '' });
        setIsAdding(false);
    };

    const copyToClipboard = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="admin-content-page">
            <div className="admin-header-row">
                <div>
                    <h1>Gestión de Cobranzas</h1>
                    <p>Creá cupones de pago (Facturas/Invoices) para que tus clientes paguen desde el portal.</p>
                </div>
                <button
                    className="btn btn-primary btn-icon"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    <Plus size={18} />
                    {isAdding ? 'Cancelar' : 'Nueva Factura'}
                </button>
            </div>

            {isAdding && (
                <div className="admin-form-card">
                    <h2>Generar Nuevo Link de Pago</h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Nombre del Cliente / Empresa</label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                placeholder="Ej. Acme Corp"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción del Servicio (Concepto)</label>
                            <input
                                type="text"
                                value={formData.serviceDesc}
                                onChange={(e) => setFormData({ ...formData, serviceDesc: e.target.value })}
                                placeholder="Ej. Mantenimiento mensual (Febrero)"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group half">
                                <label>Moneda</label>
                                <select
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value as 'USD' | 'ARS' })}
                                >
                                    <option value="USD">USD (Dólares)</option>
                                    <option value="ARS">ARS (Pesos Argentinos)</option>
                                </select>
                            </div>
                            <div className="form-group half">
                                <label>Monto</label>
                                <input
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="Ej. 1000"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Vencimiento de la Cuota</label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            Crear Factura
                        </button>
                    </form>
                </div>
            )}


            <div className="admin-list">
                {invoices.length === 0 ? (
                    <div className="empty-state">
                        <FileText size={48} />
                        <p>No hay facturas generadas. ¡Creá la primera para empezar a cobrar!</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>CÓDIGO PAGO</th>
                                    <th>CLIENTE & SERVICIO</th>
                                    <th>MONTO</th>
                                    <th>ESTADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv: Invoice) => (
                                    <tr key={inv.id}>
                                        <td>
                                            <div className="invoice-code">
                                                <strong>{inv.id}</strong>
                                                <button
                                                    className={`copy-btn ${copiedId === inv.id ? 'copied' : ''}`}
                                                    onClick={() => copyToClipboard(inv.id)}
                                                    title="Copiar código para enviar al cliente"
                                                >
                                                    {copiedId === inv.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="invoice-client">{inv.clientName}</div>
                                            <div className="invoice-desc">{inv.serviceDesc}</div>
                                            <div className="invoice-date">Vence: {inv.dueDate}</div>
                                        </td>
                                        <td>
                                            <strong className="invoice-amount">
                                                {inv.currency} ${inv.amount.toLocaleString()}
                                            </strong>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${inv.status.toLowerCase()}`}>
                                                {inv.status === 'PAID' ? 'PAGADO' : 'PENDIENTE'}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            {inv.status === 'PENDING' && (
                                                <button
                                                    className="action-btn success-btn"
                                                    title="Marcar como Pagado Manualmente"
                                                    onClick={() => updateInvoiceStatus(inv.id, 'PAID')}
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            {inv.status === 'PAID' && (
                                                <button
                                                    className="action-btn pending-btn"
                                                    title="Revertir a Pendiente"
                                                    onClick={() => updateInvoiceStatus(inv.id, 'PENDING')}
                                                >
                                                    <Clock size={18} />
                                                </button>
                                            )}
                                            <button
                                                className="action-btn delete-btn"
                                                title="Eliminar Factura"
                                                onClick={() => deleteInvoice(inv.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
};

export default InvoicesAdminPage;
