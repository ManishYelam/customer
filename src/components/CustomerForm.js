import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onAddCustomer, onUpdateCustomer, editingCustomer, setEditingCustomer }) => {
  const [customer, setCustomer] = useState({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    pincode: '',
    mobile: '',
    landline: '',
    email: ''
  });

  useEffect(() => {
    if (editingCustomer) {
      setCustomer(editingCustomer);
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      onUpdateCustomer(customer);
    } else {
      const newCustomer = { ...customer, id: Date.now() }; // Generate a unique ID
      onAddCustomer(newCustomer);
    }
    setCustomer({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      pincode: '',
      mobile: '',
      landline: '',
      email: ''
    });
    setEditingCustomer(null);
  };

  return (
    <div className="container mt-3">
      <h3>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            className="form-control"
            id="middleName"
            name="middleName"
            value={customer.middleName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={customer.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="landline">Landline</label>
          <input
            type="text"
            className="form-control"
            id="landline"
            name="landline"
            value={customer.landline}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingCustomer ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => setEditingCustomer(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
