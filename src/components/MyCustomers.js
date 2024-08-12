import React, { useState, useEffect } from 'react';
import AllotmentList from './AllotmentList';
import CustomerForm from './CustomerForm';
import CustomerSearch from './CustomerSearch';

const MyCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

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

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = customers.filter(customer =>
      customer.firstName.toLowerCase().includes(lowercasedQuery) ||
      customer.middleName.toLowerCase().includes(lowercasedQuery) ||
      customer.lastName.toLowerCase().includes(lowercasedQuery) ||
      customer.address.toLowerCase().includes(lowercasedQuery) ||
      customer.pincode.includes(lowercasedQuery) ||
      customer.mobile.includes(lowercasedQuery) ||
      customer.landline.includes(lowercasedQuery) ||
      customer.email.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div>
      <h2>Customers</h2>
      <CustomerSearch customers={customers} onSearch={handleSearch} />
      <CustomerForm 
        onAddCustomer={handleAddCustomer}
        onUpdateCustomer={handleUpdateCustomer}
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
      />
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
                <button className="btn btn-warning" onClick={() => setEditingCustomer(customer)}>Edit</button>
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
