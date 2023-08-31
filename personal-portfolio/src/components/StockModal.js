import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/StockTable.css';

const StockTable = ({ stockData }) => {
  const columns = [
    { field: 'ticker', headerName: 'Ticker', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'changePercent', headerName: '% Change', width: 120 },
  ];

  return (
    <div className="stock-table-container">
      <DataGrid
        rows={stockData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default StockTable;
