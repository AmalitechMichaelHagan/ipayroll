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
  import Hresource from "./components/workersdashboard/Hresource";
  import Userform from "./components/workersdashboard/Userform";
import LoanDashboard from "./components/dashboard/LoanDashboard";




  function App() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="home" element={<Home />} />
        <Route path="/admin" element={<Hresource />} />
        <Route path="/form" element={<Userform/>} />
        <Route path="/employee" element={<LoanDashboard/>} />

    </Routes>
    </BrowserRouter>
    );
  }

  export default App;

