import logo from './logo.svg';
import './App.css';
import './validation';
import React, { useContext,useEffect, useState } from 'react'
import Pagination from './components/Pagination';

import ReactDOM from 'react-dom';
import {BrowserRouter as  Switch, Route, withRouter, Redirect,Routes ,Router} from 'react-router-dom';


import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomersApi from './services/AgendaApis';
import AgendaApis from './services/AgendaApis';
import HomePage from './Page/HomePage';
import Create from './Page/Create';

import Dashboard from './components/Dashboard';

function App() {


  return (

    
    <div className="App">
      <h1><u>Welcome to Becquerel CRUD_REACT_SPRING</u></h1>
      
        <Routes>
          {/* <Route exact path="/" element={<Dashboard/>} /> */}
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/agenda" element={<HomePage/>} />
          <Route exact path="/create" element={<Create/>} />
          {/* <Route exact path="/agenda/:id" element={<Create/>} /> */}
          <Route path="/agenda/:id" element={<Create/>} />
        </Routes>
      
      <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
        
    </div>
  );

}

export default App;
