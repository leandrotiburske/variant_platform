import React, { useState } from "react"

import onSubmit from "./onSubmit"

import platformIcon from "../assets/platform-icon.png"
import checkIcon from "../assets/check.png"

function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        registered: false,
        error: false,
        errorMessage: []
    });

    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        setForm((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };        
        });
    }

    return (
        <div className="registration">

            <img src={platformIcon} id="platform-logo" />

            {form.registered ? (
                <div className="form">

                    <img 
                        src={checkIcon} 
                        style={{
                            height: "10vh",
                            marginTop: "18px"
                            }}></img>

                    <p>Account registered succesfully.</p>
                </div>
            ) : (          
            <div className="form">

                <h1>Register</h1>

                <input 
                    type="text" 
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}></input>
                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}></input>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                ></input>


                <button onClick={() => onSubmit(form, setForm)}>Submit</button>

                {form.error ? form.errorMessage.map(message => (
                    <p style={{
                        color: "black", 
                        fontWeight: 600, 
                        margin: "18px",
                        fontSize: "15px"}}>{message}</p>
                    )) : null}

                </div>
            )}
        </div>
    );
}

export default Register;