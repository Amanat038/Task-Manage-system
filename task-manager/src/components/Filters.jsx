import React from "react";
import "./all.css";

function Filters({ currentFilter, onFilterChange }) {
   <div className="filters-container">
      <button
         className={`filter-btn ${currentFilter === "all" ? "active" : ""}`}
         onClick={() => onFilterChange("all")}
         aria-label="Show all tasks"
      >
         All
      </button>

      <button
         className={`filter-btn ${currentFilter === "pending" ? "active" : ""}`}
         onClick={() => onFilterChange("pending")}
         aria-label="Show pending tasks"
      >
         Pending
      </button>

      <button
         className={`filter-btn ${currentFilter === "all" ? "active" : ""}`}
         onClick={() => onFilterChange("Completed")}
         aria-label="Show Completed tasks"
      >
         Completed
      </button>
   </div>;
}
