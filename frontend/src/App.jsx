import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./Register/Register.jsx"
import Login from "./Login/Login.jsx"
import Patients from "./Patients/Patients.jsx"
import Home from "./Home/Home.jsx"
import RegisterPatient from "./RegisterPatient/RegisterPatient.jsx"
import PatientAnalysis from "./PatientAnalysis/PatientAnalysis.jsx"
import VariantDetails from "./PatientAnalysis/VariantDetails/VariantDetails.jsx"

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/register-patient" element={<RegisterPatient/>} />
            <Route path="/patients/:id/analysis" element={<PatientAnalysis />} />
            <Route path="/patients/:subject_id/analysis/:variant" element={<VariantDetails />} />
        </Routes>
    )
}

export default App;