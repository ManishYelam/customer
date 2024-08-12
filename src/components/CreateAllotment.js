import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const CreateAllotment = ({ onAddAllotment }) => {
  const [newAllotment, setNewAllotment] = useState({
    project: '',
    building: '',
    doorNumber: '',
    carpetArea: '',
    sellableArea: '',
    parkingType: '',
    activeStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAllotment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (Object.values(newAllotment).some(value => value.trim() === '')) {
      alert('Please fill in all fields.');
      return;
    }

    onAddAllotment(newAllotment);
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

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Add New Allotment</h3>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Project</label>
            <input
              type="text"
              className="form-control"
              name="project"
              placeholder="Project"
              value={newAllotment.project}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Building</label>
            <input
              type="text"
              className="form-control"
              name="building"
              placeholder="Building"
              value={newAllotment.building}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Door Number</label>
            <input
              type="text"
              className="form-control"
              name="doorNumber"
              placeholder="Door Number"
              value={newAllotment.doorNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Carpet Area</label>
            <input
              type="text"
              className="form-control"
              name="carpetArea"
              placeholder="Carpet Area"
              value={newAllotment.carpetArea}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sellable Area</label>
            <input
              type="text"
              className="form-control"
              name="sellableArea"
              placeholder="Sellable Area"
              value={newAllotment.sellableArea}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Parking Type</label>
            <input
              type="text"
              className="form-control"
              name="parkingType"
              placeholder="Parking Type"
              value={newAllotment.parkingType}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Active Status</label>
            <input
              type="text"
              className="form-control"
              name="activeStatus"
              placeholder="Active Status"
              value={newAllotment.activeStatus}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPlus} /> Add Allotment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAllotment;
