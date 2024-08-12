import React, { useState } from 'react';

const PaymentList = ({ payments }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentsState, setPayments] = useState(payments); // Initialize the state here
  const [newPayment, setNewPayment] = useState({
    mode: '',
    amount: '',
    received: false,
    date: '',
    valueDate: '',
    realized: false,
    bank: '',
    branch: '',
    instrumentNumber: '',
    receipt: '',
    remark: ''
  });

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
  };

  const handleAddPayment = () => {
    const newId = paymentsState.length + 1;
    setPayments([
      ...paymentsState,
      { ...newPayment, id: newId }
    ]);
    setNewPayment({
      mode: '',
      amount: '',
      received: false,
      date: '',
      valueDate: '',
      realized: false,
      bank: '',
      branch: '',
      instrumentNumber: '',
      receipt: '',
      remark: ''
    });
  };

  const handleDeletePayment = (id) => {
    setPayments(paymentsState.filter(payment => payment.id !== id));
  };

  return (
    <div>
      <h2>Payments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mode</th>
            <th>Amount</th>
            <th>Received</th>
            <th>Date</th>
            <th>Value Date</th>
            <th>Realized</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Instrument Number</th>
            <th>Receipt</th>
            <th>Remark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentsState.map(payment => (
            <tr key={payment.id} onClick={() => handleSelectPayment(payment)}>
              <td>{payment.id}</td>
              <td>{payment.mode}</td>
              <td>{payment.amount}</td>
              <td>{payment.received ? 'Yes' : 'No'}</td>
              <td>{payment.date}</td>
              <td>{payment.valueDate}</td>
              <td>{payment.realized ? 'Yes' : 'No'}</td>
              <td>{payment.bank}</td>
              <td>{payment.branch}</td>
              <td>{payment.instrumentNumber}</td>
              <td>{payment.receipt}</td>
              <td>{payment.remark}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeletePayment(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Add New Payment</h3>
        <input type="text" placeholder="Mode" value={newPayment.mode} onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })} />
        <input type="text" placeholder="Amount" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} />
        <input type="checkbox" checked={newPayment.received} onChange={(e) => setNewPayment({ ...newPayment, received: e.target.checked })} /> Received
        <input type="date" placeholder="Date" value={newPayment.date} onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })} />
        <input type="date" placeholder="Value Date" value={newPayment.valueDate} onChange={(e) => setNewPayment({ ...newPayment, valueDate: e.target.value })} />
        <input type="checkbox" checked={newPayment.realized} onChange={(e) => setNewPayment({ ...newPayment, realized: e.target.checked })} /> Realized
        <input type="text" placeholder="Bank" value={newPayment.bank} onChange={(e) => setNewPayment({ ...newPayment, bank: e.target.value })} />
        <input type="text" placeholder="Branch" value={newPayment.branch} onChange={(e) => setNewPayment({ ...newPayment, branch: e.target.value })} />
        <input type="text" placeholder="Instrument Number" value={newPayment.instrumentNumber} onChange={(e) => setNewPayment({ ...newPayment, instrumentNumber: e.target.value })} />
        <input type="text" placeholder="Receipt" value={newPayment.receipt} onChange={(e) => setNewPayment({ ...newPayment, receipt: e.target.value })} />
        <input type="text" placeholder="Remark" value={newPayment.remark} onChange={(e) => setNewPayment({ ...newPayment, remark: e.target.value })} />
        <button className="btn btn-success" onClick={handleAddPayment}>Add Payment</button>
      </div>
    </div>
  );
};

export default PaymentList;
