import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Pages/Customers";
import NavbarComponent from "./components/NavbarComponent";

function App() {

    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        setToken(storedToken)
    }, [])

    return (

        <Router>

            <NavbarComponent />

            <Routes>

                <Route path="/" element={<Navigate to="/register" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />}
                />

                <Route
                    path="/customers"
                    element={localStorage.getItem("token") ? <Customers /> : <Navigate to="/login" />}
                />

            </Routes>

        </Router>

    )
}

export default App