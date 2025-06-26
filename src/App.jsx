import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import VisitorPage from './pages/VisitorPage'; // ✅ Import the Visitor Page
import HomePage from './pages/Home';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visitor page" element={<VisitorPage />} /> {/* ✅ Set VisitorPage as default */}
        <Route path="/header" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
