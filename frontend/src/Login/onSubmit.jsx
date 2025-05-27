import axios from "axios"
import React from "react";

function onSubmit(form, setForm, navigate) {

    const formData = new URLSearchParams();
    formData.append('username', form.email);
    formData.append('password', form.password);
    formData.append('grant_type', 'password');
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');
    
    axios.post('http://localhost:8080/auth/login/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    .then(function (response) {

        const token = response.data.access_token;

        localStorage.setItem("access_token", token);
    
        navigate("../home");

    })
    .catch(function (error) {

        setForm((prevValue) => {
            return {
                ...prevValue,
                error: true,
                errorMessage: []
            }
        })
    })
}

export default onSubmit;