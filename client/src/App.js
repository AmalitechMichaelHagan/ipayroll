import React from 'react';
import { LoginPage } from './components/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Hresource from "./components/admindashboard/Hresource";
import Userform from "./components/admindashboard/Userform";
import LoanDashboard from "./components/dashboard/LoanDashboard";
import Wages from './components/admindashboard/Wages';
import EmployeeDashBoard from './components/employeedata/EmployeeDashBoard';
import Loan from './components/admindashboard/Loan';
import Rate from './components/admindashboard/Rate';
import TaxRelief from './components/admindashboard/Tax_Relief';
import ReliefForm from './components/admindashboard/TaxRelief'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Hresource />} />
        <Route path="/form" element={<Userform />} />
        <Route path="/employee" element={<LoanDashboard />} />
        <Route path="/wages" element={<Wages />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/rate" element={<Rate />} />
        <Route path="/newuser" element={<Userform />} />
        <Route path="/employee2" element={<EmployeeDashBoard/>} />
        <Route path="/relief" element={<TaxRelief/>} />
        <Route path='/reliefForm' element={<ReliefForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

