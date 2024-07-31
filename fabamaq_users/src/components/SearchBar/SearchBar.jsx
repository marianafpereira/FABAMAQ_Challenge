import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, handleKeyDown }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={onSearchChange}
                onKeyDown={handleKeyDown}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;