import React, { useState } from "react";
import { authClientApi } from "../../src/Services/Api";
import "../components/Sign.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CModalTitle,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModal,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCheckCircle } from "@coreui/icons";
const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [visible, setVisible] = useState(false);
  const [showalert, setShowAlert] = useState(false);
  const [formFields, setformFields] = useState(defaultFormFields);
  const [ErrorForms, setErrorForms] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const handleSend = async (event) => {
    event.preventDefault();
    const data = {
        email : email
    }
    const res = await authClientApi.forgot(data);
    if (res.status === 200) {
      setShowAlert(true);
      setTimeout(() => {
        setVisible(false);
        setShowAlert(false)
      }, 1500);
    }
  };
  const handleInputValueChange = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };
  const changeBorderColorOnError = (inputName) => {
    let formInput = document.getElementById(`${inputName}`);
    formInput.classList.add("error");
  };
  const handleValidation = () => {
    let error = {};
    if (!formFields.email) {
      error.email = "Email is required !";
      changeBorderColorOnError("email");
    }
    if (!formFields.password) {
      error.password = "password is required !";
      changeBorderColorOnError("password");
    }
    return error;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // pour ne pas faire refresh
    setErrorForms(handleValidation());
    console.log(formFields);
    const res = await authClientApi.login(formFields);
    if (res.status === 200) navigate("/");
  };
  const google = (event) => {
    event.preventDefault();
    console.log("Clicked Google");
    window.open("http://localhost:8000/auth/google", "_self");
  };
  return (
    <div className="container">
      <div className=" row m-4 d-flex justify-content-center">
        <div className="col-6 align-self-center">
          <div className="login-card-light p-3 shadow-lg rounded">
            <div className="pt-3">
              <h2 className="text-danger">Sign In</h2>
            </div>

            <form className="mt-5">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Email Address"
                  name="email"
                  value={formFields.email}
                  onChange={handleInputValueChange}
                />
                <span className="error-text">{ErrorForms.email}</span>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Password"
                  name="password"
                  value={formFields.password}
                  onChange={handleInputValueChange}
                />
              </div>

              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberCheckBox"
                />
                <label
                  className="form-check-label text-dark"
                  htmlFor="rememberCheckBox"
                >
                  Remember me?
                </label>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleSubmit}
                  className="btn btn-sm btn-danger col"
                >
                  Login
                </button>
                <div className="social-login-buttons">
                  <button className="google-signin-button" onClick={google}>
                    Sign in with Google
                  </button>
                  <button className="facebook-signin-button">
                    Sign in with Facebook
                  </button>
                </div>
              </div>

              <div className="text-center mt-2">
                <Link onClick={() => setVisible(!visible)}>
                  Forgot Password?
                </Link>
              </div>
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)}>
                  <CModalTitle>Email Address</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  {showalert && (
                    <CAlert
                      color="success"
                      className="d-flex align-items-center"
                    >
                      <CIcon
                        icon={cilCheckCircle}
                        className="flex-shrink-0 me-2"
                        width={24}
                        height={24}
                      />
                      <div>Email Sent , Please check your Inbox</div>
                    </CAlert>
                  )}
                  Please Enter Your Email Address To Reset Your Password
                  <CInputGroup className="mt-3 mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange}
                      value={email}
                    />
                  </CInputGroup>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSend}>
                    Send
                  </CButton>
                </CModalFooter>
              </CModal>
              <div className="mt-5">
                <p className="text-center">
                  Don't have an account?
                  <a href="/signup">Click here to register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
