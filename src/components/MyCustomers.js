import React, { useState, useEffect } from 'react';
import AllotmentList from './AllotmentList';
import CustomerForm from './CustomerForm';
import CustomerSearch from './CustomerSearch';
import Pagination from './PaginationComponent'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const MyCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(4); 

  useEffect(() => {
    fetch('/data/mockData.json')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.customers);
        setFilteredCustomers(data.customers);
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    setFilteredCustomers([...customers, newCustomer]);
    setShowForm(false);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers); 
  };

  const handleCreateClick = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleSearch = (query) => {
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = customers.filter(customer =>
        customer.firstName.toLowerCase().includes(lowercasedQuery) ||
        customer.middleName.toLowerCase().includes(lowercasedQuery) ||
        customer.lastName.toLowerCase().includes(lowercasedQuery) ||
        customer.email.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers); 
    }
    setCurrentPage(1); 
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="container mt-4">
      {/* <h2 className="mb-4">Customers</h2> */}
      
      <div className="d-flex justify-content-between mb-3">
        <CustomerSearch onSearch={handleSearch} />
        <button className="btn btn-primary" onClick={handleCreateClick}>
          <i className="fas fa-plus"></i> Create Customer
        </button>
      </div>
      
      {showForm && (
        <div className="mb-4">
          <CustomerForm 
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            editingCustomer={editingCustomer}
            setEditingCustomer={setEditingCustomer}
          />
        </div>
      )}
      
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Mobile</th>
            <th>Landline</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(customer => (
            <tr 
              key={customer.id} 
              onClick={() => handleSelectCustomer(customer)} 
              style={{ cursor: 'pointer' }}
            >
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.middleName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.address}</td>
              <td>{customer.pincode}</td>
              <td>{customer.mobile}</td>
              <td>{customer.landline}</td>
              <td>{customer.email}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditingCustomer(customer); setShowForm(true); }}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCustomer(customer.id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      {selectedCustomer && (
        <div className="mt-4">
          <AllotmentList allotments={selectedCustomer.allotments} />
        </div>
      )}
    </div>
  );
};

export default MyCustomers;
