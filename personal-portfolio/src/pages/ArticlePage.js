import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard'; // Assuming this is the correct path to your ArticleCard component
import '../styles/ArticlePage.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { processData } from '../utils/utils';
import { DataGrid } from '@mui/x-data-grid';


const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('STOCK')
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    console.log("Fetching data for:", activeCategory);
    
    const apiUrl = `https://oezchs71ze.execute-api.us-east-1.amazonaws.com/getArticles/${activeCategory}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setArticles(data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        // You can set an error state here if needed
      });
  }, [activeCategory]);
  
  useEffect(() => {
    fetchStockData();
  }, [])

  const fetchStockData = async () => {
    const tickers = ["AMZN", "AAPL", "MSFT", "TSLA", "MMM", "GNS"];
    const newData = [];
    for (const ticker of tickers) {
      try {
        const response = await fetch('https://oezchs71ze.execute-api.us-east-1.amazonaws.com/getRealTime', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticker }),
        });
        if (response.ok) {
          const data = await response.json();
          const processedData = processData(data);
          if (processedData) {
            processedData.id = ticker; // Add an id property based on ticker
            newData.push(processedData);
          }
        } else {
          console.error(`Error fetching data for ${ticker}`);
        }
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
      }
    }
    setStockData(newData);
  };
   
  const stockColumns = [
    { 
      field: 'ticker', 
      headerName: 'Ticker', 
      width: 90,
      cellClassName: 'blue-bold-cell', // Apply the blue and bold styles to all ticker cells
    },
    { field: 'price', headerName:'Price', width: 90 },
    {
      field: 'changePercent',
      headerName: '% Change',
      width: 100,
      valueFormatter: (params) => {
        const value = parseFloat(params.value);
        const color = value >= 0 ? 'green' : 'red';
        return `${value.toFixed(2)}%`;
      },
      cellClassName: (params) => {
        const value = parseFloat(params.value);
        return value >= 0 ? 'green-cell' : 'red-cell';
      },
    },
  ]

  return (
    <div className="article-container">
      <div className="article-container__tab">
        <Tabs
          value={activeCategory}
          onChange={(event,newValue) => setActiveCategory(newValue)}
          textColor="primary"
          indicatorColor="primary"
          aria-label="category tabs"
          className="tab-selector"
        >
          <Tab value="STOCK" label="STOCK" />
          <Tab value="COMMODITY" label="COMMODITY" />
          <Tab value="CURRENCY" label="CURRENCY" />

        </Tabs>
      </div>
      <div className="article-container__body">
        <div className="article-list">
          {articles.map((article) => (
            <ArticleCard
              title={article.title}
              thumbnailImage={article.thumbnailImage}
              shorturl={article.shorturl}
            />
          ))}
        </div>
        <div className="stock-table">
          <h2>Trending tickers</h2>
          <DataGrid
            rows={stockData}
            columns={stockColumns}
            autoHeight
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  );
};

// q: how do I set up the page so that each row will have three articleCard. In other words, the page will have 3 columns with each column has 1 articleCard?


export default ArticlePage;
