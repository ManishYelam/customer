import React from 'react';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="d-flex">
        <Sidebar />
        <MainSection />
      </div>
    </div>
  );
}

export default App;
