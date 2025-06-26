import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import VisitorRegForm from './components/VisitorRegForm';
import VisitorWelcome from './components/VisitorWelcome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/visitor-registration" element={<VisitorRegForm />} />
        <Route path="/visitor-welcome" element={<VisitorWelcome />} />
      </Routes>
    </Router>
  );
};

export default App;
