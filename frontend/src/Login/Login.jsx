import React, { useState } from "react"
import { Button } from "@mui/joy"
import axios from "axios"

import platformIcon from "../assets/platform-icon.png"
import checkIcon from "../assets/check.png"

function Login() {

    function onSubmit() {

        /// Change button color when submitted
        axios.post('http://localhost:8080/auth/register/', {
            "username": form.username,
            "email": form.email,
            "password": form.password
        })
        .then(function (response) {
            console.log(response);
            setForm((prevValue) => {
                return {
                    ...prevValue,
                    registrado: true
                }
            })
            
        })
        .catch(function (error) {
            console.log(error);
            
        })
    }

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        registrado: false
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

            {form.registrado ? (
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


                <button onClick={onSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default Login;