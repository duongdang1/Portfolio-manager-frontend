import React, { useState } from 'react';
import '../styles/TabSelector.css'; // Import your CSS file

const TabSelector = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="tab-selector">
      {categories.map((category) => (
        <button
          key={category}
          className={category === activeCategory ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
