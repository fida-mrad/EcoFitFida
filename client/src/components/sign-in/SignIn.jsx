import React, {useState} from "react";

const defaultFormFields = {
    email: "",
    password: "",
}

function SignIn() {

    const [formFields, setformFields] = useState(defaultFormFields);
    const [ErrorForms, setErrorForms] = useState({})
    const handleInputValueChange = (event) => {
        const {name, value} = event.target;
        setformFields({...formFields, [name]: value})
    }
    const changeBorderColorOnError = (inputName) => {
        let formInput = document.getElementById(`${inputName}`);
        formInput.classList.add("error")
    }
    const handleValidation = () => {
        let error = {}
        if (!formFields.email) {
            error.email = "Email is required !";
            changeBorderColorOnError("email");

        }
        if (!formFields.password) {
            error.password = "password is required !";
            changeBorderColorOnError("password");
        }
        return error
    }
    const handleSubmit = (event) => {
        event.preventDefault(); // pour ne pas faire refresh
        // console.log(formFields);
        setErrorForms(handleValidation())
    }
    return (
        <section className="form-container">
            <h1 className="form-heading">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item" id="email">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" name="email" value={formFields.email} onChange={handleInputValueChange} />
                    <span className="error-text">{ErrorForms.email}</span>
                </div>
                <div className="form-item" id="password">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" value={formFields.password} onChange={handleInputValueChange} />
                    <span className="error-text">{ErrorForms.password}</span>
                    <a href="#" className="forgot-password-link">Forgot password?</a>
                </div>
                <button className="form-button" type="submit">Sign In</button>
            </form>
            <div className="social-login-buttons">
                <button className="google-signin-button">Sign in with Google</button>
                <button className="facebook-signin-button">Sign in with Facebook</button>
            </div>
        </section>


    )
}

export default SignIn;
