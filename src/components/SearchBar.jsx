import { useState } from 'react';

function SearchBar({ onSearch}) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearch() {
        onSearch(searchTerm);
    }
    
    return (
        <div className="SearchBar">
            <input 
                type="text" 
                placeholder="Enter A Song, Album, or Artist" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;