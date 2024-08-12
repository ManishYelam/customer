import React, { useState } from 'react';
import PaymentList from './PaymentList';

const AllotmentList = ({ allotments }) => {
  const [selectedAllotment, setSelectedAllotment] = useState(null);
  const [allotmentsState, setAllotments] = useState(allotments); // Initialize the state here
  const [newAllotment, setNewAllotment] = useState({
    project: '',
    building: '',
    doorNumber: '',
    carpetArea: '',
    sellableArea: '',
    parkingType: '',
    activeStatus: ''
  });

  const handleSelectAllotment = (allotment) => {
    setSelectedAllotment(allotment);
  };

  const handleAddAllotment = () => {
    const newId = allotmentsState.length + 1;
    setAllotments([
      ...allotmentsState,
      { ...newAllotment, id: newId }
    ]);
    setNewAllotment({
      project: '',
      building: '',
      doorNumber: '',
      carpetArea: '',
      sellableArea: '',
      parkingType: '',
      activeStatus: ''
    });
  };

  const handleDeleteAllotment = (id) => {
    setAllotments(allotmentsState.filter(allotment => allotment.id !== id));
  };

  return (
    <div>
      <h2>Allotments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project</th>
            <th>Building</th>
            <th>Door Number</th>
            <th>Carpet Area</th>
            <th>Sellable Area</th>
            <th>Parking Type</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allotmentsState.map(allotment => (
            <tr key={allotment.id} onClick={() => handleSelectAllotment(allotment)}>
              <td>{allotment.id}</td>
              <td>{allotment.project}</td>
              <td>{allotment.building}</td>
              <td>{allotment.doorNumber}</td>
              <td>{allotment.carpetArea}</td>
              <td>{allotment.sellableArea}</td>
              <td>{allotment.parkingType}</td>
              <td>{allotment.activeStatus}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleSelectAllotment(allotment)}>View Payments</button>
                <button className="btn btn-danger" onClick={() => handleDeleteAllotment(allotment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Add New Allotment</h3>
        <input type="text" placeholder="Project" value={newAllotment.project} onChange={(e) => setNewAllotment({ ...newAllotment, project: e.target.value })} />
        <input type="text" placeholder="Building" value={newAllotment.building} onChange={(e) => setNewAllotment({ ...newAllotment, building: e.target.value })} />
        <input type="text" placeholder="Door Number" value={newAllotment.doorNumber} onChange={(e) => setNewAllotment({ ...newAllotment, doorNumber: e.target.value })} />
        <input type="text" placeholder="Carpet Area" value={newAllotment.carpetArea} onChange={(e) => setNewAllotment({ ...newAllotment, carpetArea: e.target.value })} />
        <input type="text" placeholder="Sellable Area" value={newAllotment.sellableArea} onChange={(e) => setNewAllotment({ ...newAllotment, sellableArea: e.target.value })} />
        <input type="text" placeholder="Parking Type" value={newAllotment.parkingType} onChange={(e) => setNewAllotment({ ...newAllotment, parkingType: e.target.value })} />
        <input type="text" placeholder="Active Status" value={newAllotment.activeStatus} onChange={(e) => setNewAllotment({ ...newAllotment, activeStatus: e.target.value })} />
        <button className="btn btn-success" onClick={handleAddAllotment}>Add Allotment</button>
      </div>

      {selectedAllotment && <PaymentList payments={selectedAllotment.payments} />}
    </div>
  );
};

export default AllotmentList;
