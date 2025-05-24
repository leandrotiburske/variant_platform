import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./Register/Register"

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register/>} />
        </Routes>
    )
}

export default App;