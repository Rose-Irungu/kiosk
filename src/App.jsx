import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Card1 from './components/Card1';
import Card2 from './components/Card2';
import Card3 from './components/Card3';
import Card4 from './components/Card4';
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
import Triggers from './components/tables/Triggers'; // Ensure Triggers is imported correctly
import Layout from './components/layout/Layout';
import Header1 from './components/layout/Header1';
import ProfileMenu from './components/layout/ProfileMenu';
import Sidebar from './components/layout/Sidebar';
import Chart from './components/Chart'; 
import Chart2 from './components/Chart2';// Ensure Chart is imported correctly


import Dashboard from './pages/Dashboardpages/Dashboard'; 
import UsersPage from './pages/Dashboardpages/userspage';





const App = () => {
  const [users, setUsers] = useState([
    {
      name: "Derick Ochieng",
      phone: "0756755634",
      role: "Resident",
      unit: "C-04",
      status: "Active",
      photo: "/ellipse-160.png",
      email: "derick@example.com",
      id: "12345678",
    },
    {
      name: "Haron Mureithi",
      phone: "0744678751",
      role: "Resident",
      unit: "B-04",
      status: "Active",
      photo: "/ellipse-161.png",
      email: "haron@example.com",
      id: "87654321",
    },
    {
      name: "Jackson Munene",
      phone: "0709787856",
      role: "Security",
      unit: "--",
      status: "Frozen",
      photo: "/ellipse-162.png",
      email: "jackson@example.com",
      id: "99887766",
    },
    {
      name: "Lucy Wanja",
      phone: "0108978651",
      role: "Security",
      unit: "--",
      status: "Frozen",
      photo: "/ellipse-163.png",
      email: "lucy@example.com",
      id: "22334455",
    },
    {
      name: "Mary Adhiambo",
      phone: "0718674563",
      role: "Resident",
      unit: "B-10",
      status: "Active",
      photo: "/ellipse-164.png",
      email: "mary@example.com",
      id: "55667788",
    },

  ]);

  return (
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/card1" element={<Card1 />} />
        <Route path="/card2" element={<Card2 />} />
        <Route path="/card3" element={<Card3 />} />
        <Route path="/card4" element={<Card4 />} />
        <Route path="/visitorpage" element={<VisitorPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/welcomeback" element={<Welcomeback />} />
        <Route path="/bye" element={<Bye />} />
        <Route path="/error" element={<Error />} />
        <Route path="/dashboardtable" element={<DashboardTable />} />

        {/* ✅ Share users state */}
        <Route path="/users" element={<Users users={users} setUsers={setUsers} />} />
        <Route path="/userform" element={<UserForm setUsers={setUsers} />} />
        <Route path="/userspage" element={<UsersPage users={users} setUsers={setUsers} />} />

        <Route path="/visitors" element={<Visitors />} />
        <Route path="/emergencies" element={<Emergencies />} />
        <Route path="/incident" element={<Incident />} />
        <Route path="/triggers" element={<Triggers />} /> {/* Ensure Triggers is imported correctly */}
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
