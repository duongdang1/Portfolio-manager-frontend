import React, { useState, useEffect } from 'react';
import '../styles/StockPage.css';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const tickers = ["AMZN", "AAPL", "MSFT", "TSLA","MSFT","MMM","GNS"];

  useEffect(() => {
    const fetchData = async () => {
      const newData = [];
      for (const ticker of tickers) {
        try {
            const response = await fetch('https://oezchs71ze.execute-api.us-east-1.amazonaws.com/getRealTime', {
                method: 'POST', // Use GET method
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ ticker }), // Include the payload in the body
                });
          if (response.ok) {
            const data = await response.json();
            newData.push(processData(data));
          } else {
            console.error(`Error fetching data for ${ticker}`);
          }
        } catch (error) {
          console.error(`Error fetching data for ${ticker}:`, error);
        }
      }
      setStockData(newData);
    };

    fetchData();
  }, []);

  const processData = (rawData) => {
    const processedData = {
      ticker: rawData.ticker.S.split(":")[0],
      price: parseFloat(rawData.price.N),
      open: parseFloat(rawData.open.N),
      high: parseFloat(rawData.high.N),
      low: parseFloat(rawData.low.N),
      volume: parseInt(rawData.volume.N),
      change: parseFloat(rawData.change.N),
      changePercent: parseFloat(rawData.changePercent.N),
      lastUpdate: rawData.lastUpdate.S,
    };
    return processedData;
  };

  return (
    <div className="stock-list-container">
      <h2>Stocks</h2>
      <ul className="stock-list">
        {stockData.map((stock, index) => (
          <li className="stock-list-item" key={index}>
            <span className="stock-name">{stock.ticker}</span>
            <span className="stock-price">${stock.price.toFixed(2)}</span>
            <span className={`stock-change ${stock.change >= 0 ? 'positive-value' : 'negative-value'}`}>
              {stock.change.toFixed(2)}
            </span>
            <span className={`stock-change-percent ${stock.changePercent >= 0 ? 'positive-value' : 'negative-value'}`}>
              {stock.changePercent.toFixed(2)}%
            </span>
            <span className='stock-volume'>{stock.volume}</span>
            <span className='stock-last-update'>{stock.lastUpdate}</span> 
            <span className='stock-open'>{stock.open}</span>
            <span className='stock-high'>{stock.high}</span>
            <span className='stock-low'>{stock.low}</span>
            {/* Include other properties from the processed data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPage;
