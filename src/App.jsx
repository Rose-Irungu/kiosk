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
import { DashboardTable } from './components/tables/DashboardTable';
import Users from './components/tables/Users';
import Visitors from './components/tables/visitors';
import Emergencies from './components/tables/Emergencies';
import Incident from './components/tables/Incident'; 





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/visitorpage" element={<VisitorPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/welcomeback" element={<Welcomeback />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/error" element={<Error />} />
        <Route path="/dashboardtable" element={<DashboardTable />} />
        <Route path="/users" element={<Users />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/emergencies" element={<Emergencies />} />
        <Route path="/incident" element={<Incident />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
