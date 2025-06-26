import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import VisitorPage from './pages/VisitorPage';
import Verify from './pages/Verify';
import Bye from './pages/Bye'
import Error from './pages/Error'
import VisitorWelcome from './pages/VisitorWelcome';
import Welcomeback from './pages/Welcomeback';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Welcome />} /> {/* brian Uncomment when done*/}
        <Route path="/" element={<VisitorPage />} /> 
        <Route path="/header" element={<Header />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/verify" element={<Verify />} />
        {<Route path="/welcomeback" element={< VisitorWelcome/>} /> }
        {/* <Route path="/checkout" element={<checkout />} /> */}{/* Nigel uncomment when done */}
        <Route path="/welcomeback" element={<VisitorWelcome />} />
        <Route path="/bye" element={<Bye />} />{/* Rebecca uncomment when done - done */}
        <Route path="/error" element={<Error />} />{/* Rebecca uncomment when done - done */}
        <Route path="/welcomeback" element={<Welcomeback />} /> 
         
       

        
      </Routes>
    </Router>
  );
};

export default App;