import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const PaymentList = ({ payments }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentsState, setPayments] = useState(payments);
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
    const newId = paymentsState.length ? paymentsState[paymentsState.length - 1].id + 1 : 1;
    setPayments([...paymentsState, { ...newPayment, id: newId }]);
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
    <div className="container mt-4">
      {/* <h2 className="mb-4">Payments</h2> */}

      <table className="table table-striped table-bordered">
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
                <button className="btn btn-danger  btn-sm" onClick={() => handleDeletePayment(payment.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="mt-4">
        <h3 className="mb-3">Add New Payment</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Mode"
              value={newPayment.mode}
              onChange={(e) => setNewPayment({ ...newPayment, mode: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={newPayment.received}
                onChange={(e) => setNewPayment({ ...newPayment, received: e.target.checked })}
              />
              <label className="form-check-label">Received</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Value Date"
              value={newPayment.valueDate}
              onChange={(e) => setNewPayment({ ...newPayment, valueDate: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={newPayment.realized}
                onChange={(e) => setNewPayment({ ...newPayment, realized: e.target.checked })}
              />
              <label className="form-check-label">Realized</label>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Bank"
              value={newPayment.bank}
              onChange={(e) => setNewPayment({ ...newPayment, bank: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Branch"
              value={newPayment.branch}
              onChange={(e) => setNewPayment({ ...newPayment, branch: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Instrument Number"
              value={newPayment.instrumentNumber}
              onChange={(e) => setNewPayment({ ...newPayment, instrumentNumber: e.target.value })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Receipt"
              value={newPayment.receipt}
              onChange={(e) => setNewPayment({ ...newPayment, receipt: e.target.value })}
            />
          </div>
          <div className="col-md-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Remark"
              value={newPayment.remark}
              onChange={(e) => setNewPayment({ ...newPayment, remark: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-success" onClick={handleAddPayment}>
          <FontAwesomeIcon icon={faPlus} /> Add Payment
        </button>
      </div> */}
    </div>
  );
};

export default PaymentList;
