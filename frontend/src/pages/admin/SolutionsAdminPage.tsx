import React, { useState } from 'react';
import { useSolutionsAdmin } from '../../hooks/useSolutionsAdmin';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { Solution } from '../../data/solutions';
import './AdminCRUDParams.css';

const SolutionsAdminPage = () => {
    const { solutions, addSolution, updateSolution, deleteSolution } = useSolutionsAdmin();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        icon: '',
        features: '', // We'll handle this as a comma separated string for the form
        price: 0,
        isPopular: false
    });

    const handleOpenForm = (item?: Solution) => {
        if (item) {
            setIsEditing(true);
            setCurrentId(item.id);
            setFormData({
                title: item.title,
                slug: item.slug,
                shortDescription: item.shortDescription,
                fullDescription: item.fullDescription,
                icon: item.icon,
                features: item.features.join(', '),
                price: item.price,
                isPopular: item.isPopular || false
            });
        } else {
            setIsEditing(true);
            setCurrentId(null);
            setFormData({
                title: '',
                slug: '',
                shortDescription: '',
                fullDescription: '',
                icon: 'Box',
                features: '',
                price: 0,
                isPopular: false
            });
        }
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const parsedData = {
            ...formData,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f.length > 0)
        };

        if (currentId) {
            updateSolution(currentId, parsedData);
        } else {
            addSolution(parsedData);
        }
        handleCloseForm();
    };

    return (
        <div className="crud-page">
            <div className="crud-header">
                <div>
                    <h1>Gestión de Soluciones</h1>
                    <p>Administrá los servicios de software y arquitectura B2B.</p>
                </div>
                {!isEditing && (
                    <button className="btn-primary" onClick={() => handleOpenForm()}>
                        <Plus size={18} />
                        Nueva Solución
                    </button>
                )}
            </div>

            {isEditing ? (
                <form className="crud-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h2>{currentId ? 'Editar Solución' : 'Crear Nueva Solución'}</h2>
                        <button type="button" className="btn-icon" onClick={handleCloseForm}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Título del Servicio</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Slug (URL)</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Icono (Nombre de Lucide React, ej: Database, Server)</label>
                            <input
                                type="text"
                                required
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Precio Base (USD)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                        </div>

                        <div className="form-group full-width" style={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="checkbox"
                                id="isPopular"
                                checked={formData.isPopular}
                                onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
                                style={{ width: 'auto' }}
                            />
                            <label htmlFor="isPopular" style={{ margin: 0, cursor: 'pointer' }}>Marcar como Destacado / Popular</label>
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción Corta (Tarjeta)</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.shortDescription}
                                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción Larga (Detalle)</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Módulos Incluidos (Separados por Coma)</label>
                            <textarea
                                required
                                rows={3}
                                placeholder="Ej: Análisis predictivo, Despliegue en AWS, Interfaz gráfica dinámica"
                                value={formData.features}
                                onChange={e => setFormData({ ...formData, features: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={handleCloseForm}>Cancelar</button>
                        <button type="submit" className="btn-primary">
                            <Save size={18} />
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            ) : (
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Icono</th>
                                <th>Precio</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solutions.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.title}</strong>
                                        {item.isPopular && <span className="badge" style={{ marginLeft: '0.5rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Popular</span>}
                                        <div className="text-sm sub-text">/{item.slug}</div>
                                    </td>
                                    <td>{item.icon}</td>
                                    <td>${item.price.toLocaleString()} USD</td>
                                    <td className="text-right actions-cell">
                                        <button className="btn-icon text-blue" onClick={() => handleOpenForm(item)}>
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="btn-icon text-red" onClick={() => deleteSolution(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {solutions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No hay soluciones cargadas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SolutionsAdminPage;
