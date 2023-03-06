import React, {useState} from "react";

const defaultFormFields = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    BirthDay: "",
    Image: ""

}

function SignUp() {

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
    const handleValidations = () => {
        let error = {}
        if (!formFields.firstName) {
            error.firstName = "firstName is required !";
            changeBorderColorOnError("firstName");
        }
        if (!formFields.lastName) {
            error.lastName = "lastName is required !";
            changeBorderColorOnError("lastName");
        }
        if (!formFields.userName) {
            error.userName = "userName is required !";
            changeBorderColorOnError("userName");
        }
        if (!formFields.email) {
            error.email = "email is required !";
            changeBorderColorOnError("email");
        }
        if (!formFields.password) {
            error.password = "password is required !";
            changeBorderColorOnError("password");
        }
        if (!formFields.confirmPassword) {
            error.confirmPassword = "confirmPassword is required !";
            changeBorderColorOnError("confirmPassword");
        }
        if (!formFields.phone) {
            error.phone = "phone is required !";
            changeBorderColorOnError("phone");
        }
        if (!formFields.BirthDay) {
            error.BirthDay = "Birthday is required !";
            changeBorderColorOnError("BirthDay");
        }

        return error
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // pour ne pas faire refresh
        // console.log(formFields);
        setErrorForms(handleValidations())
    }
    return (
        <section className="form-container">
            <h1 className="form-heading"> Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item" id="firstName">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter your First Name" name="firstName"
                           value={formFields.firstName}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.firstName}</span>
                </div>
                <div className="form-item" id="lastName">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter Last Name" name="lastName" value={formFields.lastName}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.lastName}</span>
                </div>

                <div className="form-item" id="userName">
                    <label>User Name</label>
                    <input type="text" placeholder="Enter User Name" name="userName" value={formFields.userName}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.userName}</span>
                </div>
                <div className="form-item" id="email">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your Email" name="email" value={formFields.email}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.email}</span>
                </div>
                <div className="form-item" id="password">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your Password" name="password" value={formFields.password}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.password}</span>
                </div>
                <div className="form-item" id="confirmPassword">
                    <label> Confirm your Password</label>
                    <input type="password" placeholder="Confirm your Password" name="confirmPassword"
                           value={formFields.confirmPassword}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.confirmPassword}</span>
                </div>
                <div className="form-item" id="phone">
                    <label>Phone</label>
                    <input type="number" placeholder="Enter your Phone" name="phone" value={formFields.phone}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.phone}</span>
                </div>
                <div className="form-item" id="BirthDay">
                    <label>BirthDay</label>
                    <input type="date" name="BirthDay" value={formFields.BirthDay}
                           onChange={handleInputValueChange}/>
                    <span className="error-text">{ErrorForms.BirthDay}</span>
                </div>
                <div className="form-item" id="image">
                    <label>Profile Image</label>
                    <input type="file" placeholder="Enter your name" name="Image" value={formFields.Image}
                           onChange={handleInputValueChange}/>

                </div>
                <button className="form-button" type="submit">Sign Up</button>
            </form>
        </section>
    )
}

export default SignUp;
