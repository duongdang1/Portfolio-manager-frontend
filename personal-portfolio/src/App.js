// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import StockPage from './pages/StockPage';
import PortfolioPage from './pages/Portfolio';
import WatchlistPage from './pages/Watchlist';
import ArticlePage from './pages/ArticlePage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" exact element={<StockPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/news" element={<ArticlePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
