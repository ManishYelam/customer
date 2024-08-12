import React, { useState, useEffect } from 'react';
import AllotmentList from './AllotmentList';
import CustomerForm from './CustomerForm';
import CustomerSearch from './CustomerSearch';

const MyCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/data/mockData.json')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.customers);
        setFilteredCustomers(data.customers); // Initialize filteredCustomers
      })
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    setFilteredCustomers([...customers, newCustomer]); // Update filteredCustomers
    setShowForm(false);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers); // Update filteredCustomers
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers); // Update filteredCustomers
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
      setFilteredCustomers(customers); // Show all customers if search is cleared
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <button className="btn btn-primary mb-3" onClick={handleCreateClick}>
        Create Customer
      </button>
      {showForm && (
        <CustomerForm 
          onAddCustomer={handleAddCustomer}
          onUpdateCustomer={handleUpdateCustomer}
          editingCustomer={editingCustomer}
          setEditingCustomer={setEditingCustomer}
        />
      )}
      <CustomerSearch onSearch={handleSearch} />
      <table className="table">
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
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
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
                <button className="btn btn-primary" onClick={() => handleSelectCustomer(customer)}>View Allotments</button>
                <button className="btn btn-warning" onClick={() => { setEditingCustomer(customer); setShowForm(true); }}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && <AllotmentList allotments={selectedCustomer.allotments} />}
    </div>
  );
};

export default MyCustomers;
