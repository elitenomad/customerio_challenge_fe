import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Customer from "./components/Customer";
import CustomersList from "./components/CustomersList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/customers" className="navbar-brand">
          Customer.IO 
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/customers"} className="nav-link">
              Customers
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CustomersList/>} />
          <Route path="/customers" element={<CustomersList/>} />
          <Route path="/customers/:id" element={<Customer/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
