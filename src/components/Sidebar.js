import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '280px', height: '100vh' }}>
      <h5 className="text-center">My Workspace</h5>
      <Nav className="flex-column">
        <Nav.Link href="#/profile">Profile</Nav.Link>
        <Nav.Link href="#/sale">Sale</Nav.Link>
        <Nav.Link href="#/site">Site</Nav.Link>
        <Nav.Link href="#/reports">Reports</Nav.Link>
        <Nav.Link href="#/construction">Construction</Nav.Link>
        <Nav.Link href="#/alerts">Alerts</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
