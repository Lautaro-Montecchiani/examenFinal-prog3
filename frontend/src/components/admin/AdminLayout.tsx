import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hexagon, LayoutDashboard, Newspaper, Briefcase, LogOut, CreditCard } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <Hexagon color="var(--accent-primary)" size={32} />
                    <h2>Admin Panel</h2>
                </div>

                <nav className="admin-nav">
                    <Link
                        to="/admin/dashboard"
                        className={`admin-nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/novedades"
                        className={`admin-nav-item ${isActive('/admin/novedades') ? 'active' : ''}`}
                    >
                        <Newspaper size={20} />
                        <span>Noticias</span>
                    </Link>
                    <Link
                        to="/admin/soluciones"
                        className={`admin-nav-item ${isActive('/admin/soluciones') ? 'active' : ''}`}
                    >
                        <Briefcase size={20} />
                        <span>Soluciones</span>
                    </Link>
                    <Link
                        to="/admin/invoices"
                        className={`admin-nav-item ${isActive('/admin/invoices') ? 'active' : ''}`}
                    >
                        <CreditCard size={20} />
                        <span>Cobranzas</span>
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main-content">
                <header className="admin-topbar">
                    <div className="admin-topbar-info">
                        <span className="admin-badge">Modo Demo</span>
                        <p>Bienvenido al Panel de Gestión de AIDS.</p>
                    </div>
                    <Link to="/" className="back-to-site-btn" target="_blank">
                        Ver Sitio Web
                    </Link>
                </header>

                <div className="admin-content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
