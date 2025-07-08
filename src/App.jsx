import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Card1 from './components/Card1';
import { SkeletonCard } from './components/SkeletonCard';
import Home from './pages/Home';
import VisitorPage from './pages/VisitorPage';
import Verify from './pages/Verify';
import Bye from './pages/Bye';
import Error from './pages/Error';
import Welcomeback from './pages/Welcomeback';
import { DashboardTable } from './components/tables/DashboardTable';
import Users from './components/tables/Users';
import Visitors from './components/tables/Visitors';
import Emergencies from './components/tables/Emergencies';
import Incident from './components/tables/Incident'; 
import Layout from './components/layout/Layout';
import Header1 from './components/layout/Header1';
import ProfileMenu from './components/layout/ProfileMenu';
import Sidebar from './components/layout/Sidebar';
import Chart from './components/Chart'; 
import Chart2 from './components/Chart2';// Ensure Chart is imported correctly


import Dashboard from './pages/Dashboardpages/Dashboard'; 
import UsersPage from './pages/Dashboardpages/userspage';





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/card1" element={<Card1 />} />
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skeletoncard" element={<SkeletonCard />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/header1" element={<Header1 />} />   
        <Route path="/profilemenu" element={<ProfileMenu />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/chart" element={<Chart />} /> 
        <Route path="/userspage" element={<UsersPage />} />
        <Route path="/chart2" element={<Chart2 />} /> {/* Ensure Chart2 is imported correctly */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
