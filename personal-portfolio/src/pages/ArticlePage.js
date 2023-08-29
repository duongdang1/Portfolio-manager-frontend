import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard'; // Assuming this is the correct path to your ArticleCard component
import '../styles/ArticlePage.css';

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://oezchs71ze.execute-api.us-east-1.amazonaws.com/getArticles';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setArticles(data))
      .catch(error => {
        console.error('Error fetching articles:', error);
        // You can set an error state here if needed
      });
  }, []);

  return (
    <div className="article-page-container">
      
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            thumbnailImage={article.thumbnailImage}
            shorturl={article.shorturl}
          />
        ))}
      
    </div>
  );
};

// q: how do I set up the page so that each row will have three articleCard. In other words, the page will have 3 columns with each column has 1 articleCard?


export default ArticlePage;
