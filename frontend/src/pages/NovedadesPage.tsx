import { Link } from 'react-router-dom';
import { newsData } from '../data/news';
import './NovedadesPage.css';

const NovedadesPage = () => {
    return (
        <div className="novedades-page">
            <section className="novedades-header">
                <div className="container">
                    <h1 className="display-title">Últimas <span>Novedades</span></h1>
                    <p className="subtitle">
                        Mantenete al tanto de nuestros eventos, lanzamientos y tendencias en el ecosistema digital e IA.
                    </p>
                </div>
            </section>

            <section className="news-list-section">
                <div className="container">
                    <div className="news-grid">
                        {newsData.map((news) => (
                            <article key={news.id} className="news-card">
                                <Link to={`/novedades/${news.slug}`} className="news-image-wrapper">
                                    <div className="news-category">{news.category}</div>
                                    <img src={news.imageUrl} alt={news.title} className="news-image" />
                                </Link>
                                <div className="news-content">
                                    <span className="news-date">{news.date}</span>
                                    <Link to={`/novedades/${news.slug}`} className="news-title-link">
                                        <h3>{news.title}</h3>
                                    </Link>
                                    <p className="news-summary">{news.summary}</p>
                                    <Link to={`/novedades/${news.slug}`} className="read-more-btn">
                                        Leer artículo completo
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="newsletter-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿No querés perderte nada?</h2>
                        <p>Suscribite a nuestro newsletter y recibí las últimas actualizaciones sobre e-commerce B2B e IA directamente en tu inbox.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Tu correo electrónico" required />
                            <button type="submit" className="btn btn-primary">Suscribirme</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NovedadesPage;
