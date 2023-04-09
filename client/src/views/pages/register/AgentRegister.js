import React, { useState } from "react";
import {
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
import { cilLockLocked, cilUser, cilImage} from "@coreui/icons";
import { authAgent } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

const AgentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    brandname: "",
    profileimg: null,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { firstname, lastname, email, password, brandname, profileimg } =
    formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleFileInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleSubmit = async () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      brand: {
        brandname: brandname,
      },
      profileimg: profileimg,
    };
    const res = await authAgent.register(data);
    console.log(data);
    if (res.status === 201) navigate("/agentlogin");
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm encType="multipart/form-data">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Firstname"
                      autoComplete="firsname"
                      onChange={handleChange("firstname")}
                      value={firstname}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Lastname"
                      autoComplete="lastname"
                      onChange={handleChange("lastname")}
                      value={lastname}
                    />
                  </CInputGroup>
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
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="confirmPassword"
                      onChange={handleConfirmPasswordChange}
                      value={confirmPassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Brandname"
                      autoComplete="brandname"
                      onChange={handleChange("brandname")}
                      value={brandname}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilImage} />
                      </CInputGroupText>
                      {/* <CFormInput
                        placeholder="ProfileImage"
                        autoComplete="profileimg"
                        onChange={handleChange("profileimg")}
                        value={profileimg}
                      /> */}
                      <CFormInput type="file" id="formFile" name="profileimg" onChange={handleFileInput} />
                    </CInputGroup>
                    <CButton
                      color="success"
                      disabled={password !== confirmPassword}
                      onClick={handleSubmit}
                    >
                      Create Account
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
};

export default AgentRegister;
