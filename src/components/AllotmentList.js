import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateAllotment from './CreateAllotment';
import PaymentList from './PaymentList';
import Pagination from './PaginationComponent'; // Ensure you have a Pagination component
import AllotmentSearch from './AllotmentSearch'; // Import the search component
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const AllotmentList = ({ allotments }) => {
  const [selectedAllotment, setSelectedAllotment] = useState(null);
  const [allotmentsState, setAllotments] = useState(allotments);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectAllotment = (allotment) => {
    setSelectedAllotment(allotment);
  };

  const handleAddAllotment = (newAllotment) => {
    const newId = allotmentsState.length ? allotmentsState[allotmentsState.length - 1].id + 1 : 1;
    setAllotments([...allotmentsState, { ...newAllotment, id: newId }]);
  };

  const handleDeleteAllotment = (id) => {
    setAllotments(allotmentsState.filter(allotment => allotment.id !== id));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Filter allotments based on search query
  const filteredAllotments = allotmentsState.filter(allotment =>
    allotment.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allotment.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
    allotment.doorNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the index of the first and last item for the current page
  const indexOfLastAllotment = currentPage * itemsPerPage;
  const indexOfFirstAllotment = indexOfLastAllotment - itemsPerPage;
  const currentAllotments = filteredAllotments.slice(indexOfFirstAllotment, indexOfLastAllotment);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredAllotments.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Allotments</h2>

      {/* Add the search component */}
      <AllotmentSearch onSearch={handleSearch} />

      {/* <div className="mb-3">
        <CreateAllotment onAddAllotment={handleAddAllotment} />
      </div> */}

      <table className="table table-striped table-bordered">
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
          {currentAllotments.map(allotment => (
            <tr key={allotment.id} onClick={() => handleSelectAllotment(allotment)} style={{ cursor: 'pointer' }}>
              <td>{allotment.id}</td>
              <td>{allotment.project}</td>
              <td>{allotment.building}</td>
              <td>{allotment.doorNumber}</td>
              <td>{allotment.carpetArea}</td>
              <td>{allotment.sellableArea}</td>
              <td>{allotment.parkingType}</td>
              <td>{allotment.activeStatus}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => handleSelectAllotment(allotment)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAllotment(allotment.id)}>
                  <FontAwesomeIcon icon={faTrash} />
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

      {selectedAllotment && (
        <div className="mt-4">
          <h3 className="mb-3">Payments for Allotment ID: {selectedAllotment.id}</h3>
          <PaymentList payments={selectedAllotment.payments} />
        </div>
      )}
    </div>
  );
};

export default AllotmentList;
