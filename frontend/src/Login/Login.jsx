import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import onSubmit from "./onSubmit"

import styles from "./Login.module.css"

import platformIcon from "../assets/platform-icon.png"
import checkIcon from "../assets/check.png"

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
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

    function handleKeyPress(keypress) {
        if (keypress.key === 'Enter') {
            onSubmit(form, setForm, navigate);
        }
    };

    return (
        <div className={styles["account-page"]}>

            <img src={platformIcon} id={styles["platform-logo"]} />

            <div className={styles["form"]}>

                <h1>Sign in</h1>

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyPress={(keypress) => handleKeyPress(keypress)}
                ></input>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    onChange={handleChange}
                    onKeyPress={(keypress) => handleKeyPress(keypress)}
                ></input>


                <button
                    onClick={() => onSubmit(form, setForm, navigate)}
                >Submit</button>

                {form.error ? form.errorMessage.map(message => (
                    <p className={styles["error-message"]}>{message}</p>
                )) : null}

            </div>
        </div>
    );
}

export default Login;