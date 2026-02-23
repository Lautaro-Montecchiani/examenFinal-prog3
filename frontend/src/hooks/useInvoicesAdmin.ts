import { useState, useEffect } from 'react';

export interface Invoice {
    id: string; // The reference code for the client (e.g., INV-001)
    clientName: string;
    serviceDesc: string;
    amount: number;
    currency: 'USD' | 'ARS';
    status: 'PENDING' | 'PAID';
    dueDate: string;
    createdAt: string;
}

const initialInvoices: Invoice[] = [
    {
        id: 'INV-AIDS-001',
        clientName: 'Acme Corp',
        serviceDesc: 'Mantenimiento mensual - E-commerce Headless (Febrero)',
        amount: 850,
        currency: 'USD',
        status: 'PENDING',
        dueDate: '2026-02-28',
        createdAt: new Date().toISOString()
    },
    {
        id: 'INV-AIDS-002',
        clientName: 'TechSolutions SRL',
        serviceDesc: 'Setup inicial - Agente IA Whatsapp',
        amount: 1200000,
        currency: 'ARS',
        status: 'PAID',
        dueDate: '2026-02-15',
        createdAt: new Date(Date.now() - 864000000).toISOString() // 10 days ago
    }
];

export const useInvoicesAdmin = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('aids_invoices_data');
        if (saved) {
            setInvoices(JSON.parse(saved));
        } else {
            setInvoices(initialInvoices);
            localStorage.setItem('aids_invoices_data', JSON.stringify(initialInvoices));
        }
    }, []);

    const addInvoice = (newItem: Omit<Invoice, 'id' | 'status' | 'createdAt'>) => {
        // Generate a random 4-character string for the ID to make it look realistic
        const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();

        const invoice: Invoice = {
            ...newItem,
            id: `INV-AIDS-${randomStr}`,
            status: 'PENDING',
            createdAt: new Date().toISOString()
        };
        const updated = [invoice, ...invoices];
        setInvoices(updated);
        localStorage.setItem('aids_invoices_data', JSON.stringify(updated));

        return invoice.id;
    };

    const updateInvoiceStatus = (id: string, status: 'PENDING' | 'PAID') => {
        const updated = invoices.map(item =>
            item.id === id ? { ...item, status } : item
        );
        setInvoices(updated);
        localStorage.setItem('aids_invoices_data', JSON.stringify(updated));
    };

    const deleteInvoice = (id: string) => {
        if (window.confirm('¿Estás seguro que querés eliminar y anular este cupón de pago?')) {
            const updated = invoices.filter(item => item.id !== id);
            setInvoices(updated);
            localStorage.setItem('aids_invoices_data', JSON.stringify(updated));
        }
    };

    const getInvoiceById = (id: string): Invoice | undefined => {
        return invoices.find(inv => inv.id === id);
    };

    return { invoices, addInvoice, updateInvoiceStatus, deleteInvoice, getInvoiceById };
};
