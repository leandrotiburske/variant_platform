import React from "react"
import axios from "axios"

function onSubmit(form, setForm) {

    /// Change button color when submitted
    axios.post('http://localhost:8080/auth/register/', {
        "username": form.username,
        "email": form.email,
        "password": form.password
    })

    .then(function (response) {
        setForm((prevValue) => {
            return {
                ...prevValue,
                registered: true,
                error: false
            }
        })
        
    })

    .catch(function (error) {

        setForm((prevValue) => {
            return {
                ...prevValue,
                error: true,
                errorMessage: []
            }
        })

        if (error.response.data.detail === "Username already exists") {
            setForm((prevValue) => {
                return {
                    ...prevValue,
                    errorMessage: ["This username is already in use. Please try a different one."]
                }
            })
        } else if (error.response.data.detail === "Email already exists") {
            setForm((prevValue) => {
                return {
                    ...prevValue,
                    errorMessage: [...prevValue.errorMessage, 
                                   "This email is already in use. Please try a different one."]
                }
            })
        } else {
            setForm((prevValue) => {
                return {
                    ...prevValue,
                    errorMessage: ["Server error, please try again later."]
                }
            })
        }
    })
}

export default onSubmit;