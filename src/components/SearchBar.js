import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-2 mt-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  );
};

export default SearchBar;
