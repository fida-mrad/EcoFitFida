import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilLockUnlocked } from "@coreui/icons";
import { authAdmin } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    const res = await authAdmin.login(formData);
    if (res.status === 200) navigate("/admin");
    else {
      setError(true);
      setAlertMessage(res.data.msg);
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            {error && <CAlert color="danger">{alertMessage}</CAlert>}
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit} noValidate validated={validated}>
                  <h1>Sign In</h1>
                  <p className="text-medium-emphasis">Login to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange("email")}
                      value={email}
                      required
                      feedbackInvalid="Please provide a valid Email."
                      feedbackValid="Looks Good."
                      valid={isValidEmail(email)}
                      invalid={!isValidEmail(email)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon
                        icon={showPassword ? cilLockUnlocked : cilLockLocked}
                        onClick={handleTogglePassword}
                        style={{ cursor: "pointer" }}
                      />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange("password")}
                      value={password}
                      required
                      feedbackInvalid="Please enter your Password"
                      feedbackValid="Looks Good."
                      valid={password.length >= 1}
                      invalid={password.length < 1}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    {/* <CButton color="primary" onClick={handleSubmit}> */}
                    <CButton color="primary" type="submit">
                      Sign In
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default AdminLogin;
