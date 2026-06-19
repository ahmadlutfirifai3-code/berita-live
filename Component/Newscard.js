import React from 'react';

export default function NewsCard({ news }) {
  const { title, description, url, image, source, publishedAt, author } = news;
  
  return (
    <div className="news-card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-meta">
          <span className="source">{source}</span>
          <span className="time">{new Date(publishedAt).toLocaleString('id-ID')}</span>
        </div>
        {author && <span className="author">By: {author}</span>}
        <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">
          Baca Selengkapnya →
        </a>
      </div>
    </div>
  );
}
