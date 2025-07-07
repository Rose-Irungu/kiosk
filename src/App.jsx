import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Card1 from './components/Card1';
import Card2 from './components/Card2';
import Chart from './components/Chart';
import Chart2 from './components/Chart2';
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
import  Navigation from './components/Navigation';
import UsersPage from "./pages/Dashboardpages/userspage";








const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/card1" element={<Card1 />} />
        <Route path="/card2" element={<Card2 />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/chart2" element={<Chart2 />} />
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
         <Route path="/userform" element={<UserForm/>} />
          <Route path="/userspage" element={<UsersPage />} />


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
