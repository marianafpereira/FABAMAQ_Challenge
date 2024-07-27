import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, handleKeyDown }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={onSearchChange}
                onKeyDown={handleKeyDown}
                style={{ width: '1000px', padding: '15px' }}
            />
            <button onClick={onSearchSubmit} style={{ marginLeft: '10px' }}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;