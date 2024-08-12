import React, { useState } from 'react';

const AllotmentSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by project, building, door number, etc."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default AllotmentSearch;
