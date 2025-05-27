import api from "../api";

async function onSubmit({ form, setForm }) {
    const formData = {
        name: form.name,
        email: form.email,
    };

    try {
        const response = await api.post("http://localhost:8080/subjects", formData);
        setForm((prevValues) => ({
            ...prevValues,
            patientRegistered: true
        }));
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default onSubmit;