import React, { useState } from "react";
import { Link } from "react-router-dom";

import onSubmit from "./onSubmit";

import styles from "./Register.module.css";

import platformIcon from "../assets/platform-icon.png";
import checkIcon from "../assets/check.png";

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
        <div className={styles["account-page"]}>
            <img src={platformIcon} id={styles["platform-logo"]} alt="Platform Icon" />

            {form.registered ? (
                <div className={styles.form}>
                    <img
                        src={checkIcon}
                        style={{height: "15vh",
                            padding: "10px"
                        }}
                        alt="Check Icon"
                    />
                    <p className={styles["sucess-message"]}>Account registered successfully.</p>
                    <Link className={styles.link} to="../login">
                        Proceed to login.
                    </Link>
                </div>
            ) : (
                <div className={styles.form}>
                    <h1>Register</h1>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        className={styles.input}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className={styles.input}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className={styles.input}
                        onChange={handleChange}
                    />

                    <button
                        className={styles["submit-button"]}
                        onClick={() => onSubmit(form, setForm)}
                    >
                        Submit
                    </button>

                    {form.error
                        ? form.errorMessage.map((message, index) => (
                              <p
                                  key={index}
                                  className={styles["error-message"]}
                              >
                                  {message}
                              </p>
                          ))
                        : null}
                </div>
            )}
        </div>
    );
}

export default Register;