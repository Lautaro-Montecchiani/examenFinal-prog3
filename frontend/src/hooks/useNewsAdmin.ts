import { useState, useEffect } from 'react';
import { newsData, NewsItem } from '../data/news';

export const useNewsAdmin = () => {
    const [news, setNews] = useState<NewsItem[]>([]);

    // Initialize from local storage or fallback to static data
    useEffect(() => {
        const savedNews = localStorage.getItem('aids_news_data');
        if (savedNews) {
            setNews(JSON.parse(savedNews));
        } else {
            setNews(newsData);
            localStorage.setItem('aids_news_data', JSON.stringify(newsData));
        }
    }, []);

    const addNews = (newItem: Omit<NewsItem, 'id'>) => {
        const newsItem: NewsItem = {
            ...newItem,
            id: `news-${Date.now()}`
        };
        const updated = [newsItem, ...news];
        setNews(updated);
        localStorage.setItem('aids_news_data', JSON.stringify(updated));
    };

    const updateNews = (id: string, updatedData: Partial<NewsItem>) => {
        const updated = news.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        );
        setNews(updated);
        localStorage.setItem('aids_news_data', JSON.stringify(updated));
    };

    const deleteNews = (id: string) => {
        if (window.confirm('¿Estás seguro que querés eliminar esta noticia?')) {
            const updated = news.filter(item => item.id !== id);
            setNews(updated);
            localStorage.setItem('aids_news_data', JSON.stringify(updated));
        }
    };

    return { news, addNews, updateNews, deleteNews };
};
