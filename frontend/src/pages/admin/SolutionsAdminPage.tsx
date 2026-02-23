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
        summary: '',
        description: '',
        fullDescription: '',
        features: '', // Comma separated
        benefits: ''  // JSON stringified or just mock it for simplicity
    });

    const handleOpenForm = (item?: Solution) => {
        if (item) {
            setIsEditing(true);
            setCurrentId(item.id);
            setFormData({
                title: item.title,
                slug: item.slug,
                summary: item.summary || '',
                description: item.description || '',
                fullDescription: item.fullDescription || '',
                features: item.features ? item.features.join(', ') : '',
                benefits: item.benefits ? JSON.stringify(item.benefits) : '[]'
            });
        } else {
            setIsEditing(true);
            setCurrentId(null);
            setFormData({
                title: '',
                slug: '',
                summary: '',
                description: '',
                fullDescription: '',
                features: '',
                benefits: '[]'
            });
        }
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let parsedBenefits = [];
        try {
            parsedBenefits = JSON.parse(formData.benefits);
        } catch {
            parsedBenefits = [];
        }

        const parsedData = {
            title: formData.title,
            slug: formData.slug,
            summary: formData.summary,
            description: formData.description,
            fullDescription: formData.fullDescription,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f.length > 0),
            benefits: parsedBenefits
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

                        <div className="form-group full-width">
                            <label>Resumen Breve (Summary)</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.summary}
                                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción General (Description)</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción Larga (Detalle)</label>
                            <textarea
                                rows={4}
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Beneficios (JSON Array)</label>
                            <textarea
                                rows={3}
                                value={formData.benefits}
                                onChange={e => setFormData({ ...formData, benefits: e.target.value })}
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
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solutions.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.title}</strong>
                                        <div className="text-sm sub-text">/{item.slug}</div>
                                    </td>
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
                                    <td colSpan={2} className="text-center py-4">No hay soluciones cargadas.</td>
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
