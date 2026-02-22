import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hexagon } from 'lucide-react';
import './LoginAdminPage.css';

const LoginAdminPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (login(password)) {
            navigate(from, { replace: true });
        } else {
            setError('Contraseña incorrecta. Por favor, intentá nuevamente.');
            setPassword('');
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-container">
                <div className="admin-login-header">
                    <Hexagon color="var(--accent-primary)" size={48} className="admin-logo" />
                    <h1>Portal Administrativo</h1>
                    <p>Ingresá tu clave de acceso para gestionar el contenido B2B.</p>
                </div>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="password">Contraseña de Administrador</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="••••••••"
                            required
                            autoFocus
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>

                    <button type="submit" className="login-btn">
                        Ingresar al Panel
                    </button>
                </form>

                <div className="login-footer">
                    <p>Para propósitos de esta demo, la contraseña es <strong>admin</strong></p>
                </div>
            </div>
        </div>
    );
};

export default LoginAdminPage;
