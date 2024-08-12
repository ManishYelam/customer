import React, { useState } from 'react';

const CustomerSearch = ({ customers, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search customers..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomerSearch;
