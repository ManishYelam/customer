import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onAddCustomer, onUpdateCustomer, editingCustomer, setEditingCustomer }) => {
  const [customer, setCustomer] = useState({
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
    } else {
      setCustomer({
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        pincode: '',
        mobile: '',
        landline: '',
        email: ''
      });
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      onUpdateCustomer(customer);
    } else {
      onAddCustomer({ ...customer, id: Date.now() });
    }
    setCustomer({
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={customer.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="middleName"
        value={customer.middleName}
        onChange={handleChange}
        placeholder="Middle Name"
      />
      <input
        type="text"
        name="lastName"
        value={customer.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="address"
        value={customer.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="pincode"
        value={customer.pincode}
        onChange={handleChange}
        placeholder="Pincode"
      />
      <input
        type="text"
        name="mobile"
        value={customer.mobile}
        onChange={handleChange}
        placeholder="Mobile"
      />
      <input
        type="text"
        name="landline"
        value={customer.landline}
        onChange={handleChange}
        placeholder="Landline"
      />
      <input
        type="email"
        name="email"
        value={customer.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">
        {editingCustomer ? 'Update Customer' : 'Add Customer'}
      </button>
    </form>
  );
};

export default CustomerForm;
