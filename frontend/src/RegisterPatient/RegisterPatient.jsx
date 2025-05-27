import React, { useState } from "react";
import styles from "./RegisterPatient.module.css"
import Sidebar from "../Sidebar/Sidebar"
import onSubmit from "./onSubmit" 
import checkIcon from "../assets/check.png"

function RegisterPatient() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        patientRegistered: false,
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
            <>
            {form.patientRegistered ? (
                <div className={styles.registerPatientPage}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                <div className={styles.patientForm}>
                    <img
                        src={checkIcon}
                        style={{height: "15vh",
                            padding: "10px"
                        }}
                        alt="Check Icon"
                    />
                    <p className={styles.paragraph}>Patient registered successfully.</p>
                    <a
                      onClick={() =>
                        setForm({
                          email: "",
                          password: "",
                          patientRegistered: false,
                          error: false,
                          errorMessage: [],
                        })
                      }
                      className={styles.resubmitAnchor}
                    >Register another patient.</a>
                </div>
                </div>
            ) : (
                <div className={styles.registerPatientPage}>
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
                <div className={styles.patientForm}>
                    <h1>
                        Register new patient
                    </h1>
                    <input 
                        type="text" 
                        placeholder="Patient name"
                        autoComplete="off"
                        onChange={handleChange}
                        name="name">
                    </input>
                    <input 
                        type="text" 
                        placeholder="Patient email"
                        autoComplete="off"
                        onChange={handleChange}
                        name="email">
                    </input>
                    <button onClick={() => onSubmit({ form: form, setForm: setForm })}>
                        Submit
                    </button>
                </div>
            </div>
            )}
            </>
    )
}

export default RegisterPatient;