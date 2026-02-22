import { Link } from 'react-router-dom';
import { Newspaper, Briefcase, TrendingUp, Users } from 'lucide-react';
import { newsData } from '../../../data/news';
import { solutions } from '../../../data/solutions';
import './DashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Vista General</h1>
                <p>Resumen del estado y contenido de tu plataforma B2B.</p>
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon news-icon">
                        <Newspaper size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Noticias Publicadas</h3>
                        <span className="stat-value">{newsData.length}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon solutions-icon">
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Soluciones Activas</h3>
                        <span className="stat-value">{solutions.length}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon views-icon">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Visitas (Demo)</h3>
                        <span className="stat-value">1,248</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon leads-icon">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Leads Recientes</h3>
                        <span className="stat-value">12</span>
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
