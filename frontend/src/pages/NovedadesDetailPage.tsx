import { useParams, Link } from 'react-router-dom';
import { useNewsAdmin } from '../hooks/useNewsAdmin';
import './NovedadesDetailPage.css';

const NovedadesDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { news } = useNewsAdmin();

    const article = news.find((item) => item.slug === slug);

    if (!article) {
        return (
            <div className="not-found-page">
                <div className="container">
                    <h1>Artículo no encontrado</h1>
                    <p>La novedad a la que intentás acceder no existe o fue eliminada.</p>
                    <Link to="/novedades" className="btn btn-primary mt-4">Volver a Novedades</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="news-detail-page">
            <header className="news-detail-header" style={{ backgroundImage: `linear-gradient(rgba(4, 8, 15, 0.7), rgba(4, 8, 15, 0.9)), url(${article.imageUrl})` }}>
                <div className="container">
                    <Link to="/novedades" className="back-link">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Volver a Novedades
                    </Link>
                    <div className="news-meta">
                        <span className="news-detail-category">{article.category}</span>
                        <span className="news-detail-date">{article.date}</span>
                    </div>
                    <h1 className="news-main-title">{article.title}</h1>
                </div>
            </header>

            <div className="container news-content-wrapper">
                <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: article.content }} />

                <aside className="author-box">
                    <div className="author-info">
                        <div className="author-avatar">A</div>
                        <div>
                            <p className="author-name">Equipo AIDS</p>
                            <p className="author-role">Redacción</p>
                        </div>
                    </div>
                    <p className="author-bio">En AIDS nos dedicamos a potenciar empresas B2B integrando soluciones de e-commerce headless y agentes de Inteligencia Artificial.</p>
                    <div className="share-buttons">
                        <p className="share-text">Compartir este artículo:</p>
                        <div className="social-icons">
                            <button className="social-icon-btn" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Enlace copiado!'))}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                    <path d="M8 12C8 14.2091 6.20914 16 4 16C1.79086 16 0 14.2091 0 12C0 9.79086 1.79086 8 4 8C6.20914 8 8 9.79086 8 12ZM8 12H16M16 12C16 14.2091 17.7909 16 20 16C22.2091 16 24 14.2091 24 12C24 9.79086 22.2091 8 20 8C17.7909 8 16 9.79086 16 12Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
};

export default NovedadesDetailPage;
