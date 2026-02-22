import React, { useState } from 'react';
import { useNewsAdmin } from '../../hooks/useNewsAdmin';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { NewsItem } from '../../data/news';
import './AdminCRUDParams.css'; // A shared CSS for both CRUD pages

const NewsAdminPage = () => {
    const { news, addNews, updateNews, deleteNews } = useNewsAdmin();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        date: '',
        summary: '',
        content: '',
        imageUrl: '',
        category: ''
    });

    const handleOpenForm = (item?: NewsItem) => {
        if (item) {
            setIsEditing(true);
            setCurrentId(item.id);
            setFormData({
                title: item.title,
                slug: item.slug,
                date: item.date,
                summary: item.summary,
                content: item.content,
                imageUrl: item.imageUrl,
                category: item.category
            });
        } else {
            setIsEditing(true);
            setCurrentId(null);
            setFormData({
                title: '',
                slug: '',
                date: new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }),
                summary: '',
                content: '',
                imageUrl: '',
                category: 'Noticia'
            });
        }
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentId) {
            updateNews(currentId, formData);
        } else {
            addNews(formData);
        }
        handleCloseForm();
    };

    return (
        <div className="crud-page">
            <div className="crud-header">
                <div>
                    <h1>Gestión de Noticias</h1>
                    <p>Administrá las publicaciones del portal B2B.</p>
                </div>
                {!isEditing && (
                    <button className="btn-primary" onClick={() => handleOpenForm()}>
                        <Plus size={18} />
                        Nueva Noticia
                    </button>
                )}
            </div>

            {isEditing ? (
                <form className="crud-form" onSubmit={handleSubmit}>
                    <div className="form-header">
                        <h2>{currentId ? 'Editar Noticia' : 'Crear Nueva Noticia'}</h2>
                        <button type="button" className="btn-icon" onClick={handleCloseForm}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Título</label>
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
                            <label>Fecha</label>
                            <input
                                type="text"
                                required
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoría</label>
                            <input
                                type="text"
                                required
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>URL de Imagen</label>
                            <input
                                type="url"
                                required
                                value={formData.imageUrl}
                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Resumen Breve</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.summary}
                                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Contenido Completo (Acepta HTML básico)</label>
                            <textarea
                                required
                                rows={10}
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
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
                                <th>Título</th>
                                <th>Fecha</th>
                                <th>Categoría</th>
                                <th className="text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.title}</strong>
                                        <div className="text-sm sub-text">/{item.slug}</div>
                                    </td>
                                    <td>{item.date}</td>
                                    <td><span className="badge">{item.category}</span></td>
                                    <td className="text-right actions-cell">
                                        <button className="btn-icon text-blue" onClick={() => handleOpenForm(item)}>
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="btn-icon text-red" onClick={() => deleteNews(item.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {news.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No hay noticias cargadas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NewsAdminPage;
