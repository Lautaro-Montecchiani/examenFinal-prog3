import { Link } from 'react-router-dom';
import { Newspaper, Briefcase, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { useNewsAdmin } from '../../hooks/useNewsAdmin';
import { useSolutionsAdmin } from '../../hooks/useSolutionsAdmin';
import { useInvoicesAdmin } from '../../hooks/useInvoicesAdmin';
import './DashboardPage.css';

const DashboardPage = () => {
    const { news } = useNewsAdmin();
    const { solutions } = useSolutionsAdmin();
    const { getFinancialMetrics } = useInvoicesAdmin();

    const { monthlyRevenue, annualRevenue, pendingAmount, growthPercentage } = getFinancialMetrics();

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Panel de Control</h1>
                <p>Resumen financiero y estado de tu plataforma B2B corporativa.</p>
            </div>

            <div className="dashboard-stats-grid">
                {/* Financial Metric 1: Monthly Revenue */}
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Ingresos del Mes</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="stat-value">${monthlyRevenue.toLocaleString()}</span>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: growthPercentage >= 0 ? '#10b981' : '#ef4444',
                                backgroundColor: growthPercentage >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                padding: '2px 6px',
                                borderRadius: '12px'
                            }}>
                                {growthPercentage >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {Math.abs(growthPercentage)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Financial Metric 2: Annual Revenue */}
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Facturación Anual</h3>
                        <span className="stat-value">${annualRevenue.toLocaleString()} <span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>USD</span></span>
                    </div>
                </div>

                {/* Financial Metric 3: Pending Amount */}
                <div className="stat-card">
                    <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <Wallet size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Cobros Pendientes</h3>
                        <span className="stat-value">${pendingAmount.toLocaleString()}</span>
                    </div>
                </div>

                {/* General Metric: Active Solutions */}
                <div className="stat-card">
                    <div className="stat-icon solutions-icon">
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Servicios Activos</h3>
                        <span className="stat-value">{solutions.length}</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-actions">
                <h2>Acciones Rápidas</h2>
                <div className="action-cards">
                    <Link to="/admin/novedades" className="action-card">
                        <div className="action-content">
                            <h3>Gestionar Noticias</h3>
                            <p>Agregá, editá o eliminá las novedades y eventos que se muestran en el blog.</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>

                    <Link to="/admin/soluciones" className="action-card">
                        <div className="action-content">
                            <h3>Gestionar Soluciones</h3>
                            <p>Actualizá el catálogo de servicios, agentes IA y arquitecturas que ofrecés.</p>
                        </div>
                        <div className="action-arrow">→</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
