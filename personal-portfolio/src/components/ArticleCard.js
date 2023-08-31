import React from 'react';
import '../styles/ArticleCard.css';

const ArticleCard = ({ title, thumbnailImage, shorturl }) => {
  return (
    <div className="article-card">
      <a href={shorturl.S} target="_blank" rel="noopener noreferrer">
        <div className="article-card-content">
          <img src={thumbnailImage.S} alt={title.S} className="article-thumbnail" />
          <h3 className="article-title">{title.S}</h3>
        </div>
      </a>
    </div>
  );
};

export default ArticleCard;
