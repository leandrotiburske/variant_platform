import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./Register/Register.jsx"
import Login from "./Login/Login.jsx"
import Dashboard from "./Dashboard/Dashboard.jsx"

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}

export default App;