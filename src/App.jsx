
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegistrationForm';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';
import TicketDetail from './Ticket/TicketDetail'
import TicketForm from './Ticket/TicketForm';
import AdminDashboard from './Admin/AdminDashboard';
import TicketManagement from './Ticket/TicketManagement';


function App(){
  return (
     <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket-detail/:id" element={<TicketDetail />} />
        <Route path='/ticketform' element={<TicketForm/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/ticket' element={<TicketManagement/>}/>
       
        </Routes>
        </Router>
    
  );
}

export default App;
