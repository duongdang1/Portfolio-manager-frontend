import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/StockPage.css';
import { processData } from '../utils/utils';

const StockPage = () => {
  const [stockData, setStockData] = useState([]);
  const tickers = ["AMZN", "AAPL", "MSFT", "TSLA","MMM","GNS","HPQ","COIN","MARA","GOOG","AXLA","BOX","HPE","DNA","RIOT"];

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const columns = [
    { 
      field: 'ticker', 
      headerName: 'Ticker', 
      width: 90,
      cellClassName: 'blue-bold-cell', // Apply the blue and bold styles to all ticker cells
    },
    { field: 'price', headerName: 'Price', width: 80 },
    {
      field: 'changePercent',
      headerName: '% Change',
      width: 80,
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
    {
      field: 'change',
      headerName: 'Change',
      width: 80,
      valueFormatter: (params) => {
        const value = parseFloat(params.value);
        const color = value >= 0 ? 'green' : 'red';
        return value.toFixed(2);
      },
      cellClassName: (params) => {
        const value = parseFloat(params.value);
        return value >= 0 ? 'green-cell' : 'red-cell';
      },
    },
    { field: 'open', headerName: 'Open', width: 80 },
    { field: 'high', headerName: 'High', width: 80 },
    { field: 'low', headerName: 'Low', width: 80 },
    { field: 'volume', headerName: 'Volume', width: 100 },
    { field: 'lastUpdate', headerName: 'Last Update', width: 180 },
  ];

  return (
    <div className="stock-list-container">
      <h2>Stocks</h2>
      <div style={{ height: 1000, width: '100%' }}>
        <DataGrid
          rows={stockData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[100]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default StockPage;
