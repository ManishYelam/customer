import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search customers..."
              value={query}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text bg-primary text-white">
                <i className="bi bi-search"></i> {/* Bootstrap Icons for search icon */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSearch;
