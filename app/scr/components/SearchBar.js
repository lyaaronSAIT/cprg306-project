import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(query);
    };

    const handleClear = () => {
        setQuery(''); // Clear the search query
        handleSearch(''); // Reset search results
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={handleInputChange}
                className="py-2 px-4 bg-white text-black rounded-md shadow-md"
            />
            <button type="submit" className="ml-2 py-2 px-4 bg-violet-500 text-white rounded-md shadow-md hover:bg-violet-600">
                Search
            </button>
            {query && (
                <button type="button" onClick={handleClear} className="ml-2 py-2 px-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600">
                    Clear
                </button>
            )}
        </form>
    );
}

export default SearchBar;
