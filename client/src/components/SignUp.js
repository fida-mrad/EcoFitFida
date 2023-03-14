import React, {useState} from "react";
import {authClientApi} from "../../src/services/Api";
import "../components/Sign.css";
const defaultFormFields = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    profileimg: ""
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
        if (!formFields.firstname) {
            error.firstname = "firstname is required !";
            changeBorderColorOnError("firstname");
        }
        if (!formFields.lastname) {
            error.lastname = "lastname is required !";
            changeBorderColorOnError("lastname");
        }
        if (!formFields.username) {
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

        if (!formFields.phone) {
            error.phone = "phone is required !";
            changeBorderColorOnError("phone");
        }
        if (!formFields.birthdate) {
            error.BirthDay = "Birthday is required !";
            changeBorderColorOnError("BirthDay");
        }

        return error
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // pour ne pas faire refresh
        // console.log(formFields);
        setErrorForms(handleValidations())
        console.log(formFields)
        const res = await authClientApi.Register(formFields);
        if (res.status === 200) ;
        console.log("c bon")

    }

    return (
        <div className="container">
            <div className=" row m-4 d-flex justify-content-center">
                <div className=" col-6 align-self-center">
                    <div className="login-card-light p-3 shadow-lg rounded">
                        <div className="pt-3">
                            <h2 className="text-danger">Register</h2>
                        </div>

                        <form className="mt-6">

                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="firstname" name="firstname" value={formFields.firstname}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.firstname}</span>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="lastname" name="lastname" value={formFields.lastname}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.lastname}</span>
                            </div>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control form-control-sm"
                                       placeholder="username" name="username" value={formFields.username}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.username}</span>
                            </div>
                            <div className="form-group">
                                <input type="email"
                                       className="form-control form-control-sm"
                                       placeholder="email" name="email" value={formFields.email}
                                       onChange={handleInputValueChange}/>
                                <span className="error-text">{ErrorForms.email}</span>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control form-control-sm"
                                       placeholder="password" name="password" value={formFields.password} onChange={handleInputValueChange}/>
                            </div>
                            <div className="form-group">
                                <input type="number"
                                       className="form-control form-control-sm"
                                       placeholder="phone" name="phone" value={formFields.phone} onChange={handleInputValueChange}/>
                            </div>
                            <div className="form-group">
                                <input type="date"
                                       className="form-control form-control-sm"
                                       placeholder="birthdate" name="birthdate" value={formFields.birthdate} onChange={handleInputValueChange}/>
                            </div>
                            <div className="form-group">
                                <input type="file"
                                       className="form-control form-control-sm"
                                       placeholder="" name="profileimg" value={formFields.profileimg} onChange={handleInputValueChange}/>
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="rememberCheckBox"/>
                                <label className="form-check-label text-dark" htmlFor="rememberCheckBox">Remember
                                    me?</label>
                            </div>

                            <div className="mt-5">
                                <button onClick={handleSubmit} className="btn btn-sm btn-danger col">
                                    Login
                                </button>
                            </div>

                            <div className="text-center mt-2">
                                <a href="#">Forgot Password?</a>
                            </div>

                            <div className="mt-5">
                                <p className="text-center">
                                    Don't have an account?
                                    <a href="/signin">Already have an account ?</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp;
