import React, { useEffect, useState } from "react";
import ReactImg from "../assets/images/react.jpg";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react/dist";
import { authClientApi } from "../Services/Api";
import { useNavigate } from "react-router-dom";

function ClientDetails() {
  const navigate = useNavigate();
  const [client, setclient] = useState();
  useEffect(() => {
    setData();
  }, []);
  let setData = async () => {
    authClientApi
      .details()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setclient(res);
        }else navigate('/signin');
      })
  };
  let logoutClient = async () => {
    let res = await authClientApi.logout();
    navigate("/signin");
  };

  return (
    <CCard style={{ width: "18rem" }}>
      <CCardImage orientation="top" src={ReactImg} />
      <CCardBody>
        <CCardTitle>{client?.data.email}</CCardTitle>
        <CCardText>
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </CCardText>
        <CButton onClick={logoutClient}>Logout</CButton>
      </CCardBody>
    </CCard>
  );
}

export default ClientDetails;
