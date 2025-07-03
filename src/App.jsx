import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import { UserForm } from './components/forms/form';

import Home from './pages/Home';
import VisitorPage from './pages/VisitorPage';
import Verify from './pages/Verify';
import Bye from './pages/Bye';
import Error from './pages/Error';
import Welcomeback from './pages/Welcomeback';
import Users from './pages/Dashboardpages/users'; // ✅ corrected import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visitorpage" element={<VisitorPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/welcomeback" element={<Welcomeback />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/error" element={<Error />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/users" element={<Users />} /> {/* ✅ Users route added */}
      </Routes>
    </Router>
  );
};

export default App;
