import { useState, useEffect } from 'react';
import Head from 'next/head';
import NewsCard from '../components/NewsCard';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/news');
      const data = await response.json();
      
      if (data.success) {
        setNews(data.news);
        setLastUpdate(data.lastUpdate);
        setError(null);
      } else {
        setError('Gagal memuat berita');
      }
    } catch (err) {
      setError('Terjadi kesalahan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Auto refresh setiap 60 detik
    const interval = setInterval(fetchNews, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>News Live - Berita Terkini</title>
        <meta name="description" content="Berita live terupdate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <h1>📰 News Live</h1>
        <div className="header-info">
          <span className="live-badge">🔴 LIVE</span>
          {lastUpdate && (
            <span className="update-time">
              Update: {new Date(lastUpdate).toLocaleTimeString('id-ID')}
            </span>
          )}
          <button onClick={fetchNews} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </header>

      <main>
        {loading && news.length === 0 ? (
          <div className="loading">
            <div className="loader"></div>
            <p>Memuat berita terbaru...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>⚠️ {error}</p>
            <button onClick={fetchNews} className="retry-btn">Coba Lagi</button>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 News Live - Update real-time setiap 60 detik</p>
      </footer>
    </div>
  );
      }
