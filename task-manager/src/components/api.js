import React from 'react';
import './all.css'
function Filters({ currentFilter, onFilterChange }) {
  return (
    <div className="filters-container">
    
      <button
        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
        aria-label="Show all tasks"
      >
        All
      </button>
      
      <button
        className={`filter-btn ${currentFilter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
        aria-label="Show pending tasks"
      >
        Pending
      </button>
      <button
        className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
        aria-label="Show completed tasks"
      >
        Completed
      </button>
    </div>
  );
}

export default Filters;
