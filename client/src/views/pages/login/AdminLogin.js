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
import { cilLockLocked } from "@coreui/icons";
import { authAdmin } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = async () => {
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
                <CForm onSubmit={handleSubmit}>
                  <h1>Sign In</h1>
                  <p className="text-medium-emphasis">Login to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleChange("email")}
                      value={email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleChange("password")}
                      value={password}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleSubmit}>
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
