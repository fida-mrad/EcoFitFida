import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { authClientApi } from "../Services/Api";

function Test(props) {
    let { token } = useParams();
  const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     password: "",
//   });
  const [pass, setPass] = useState("");

//   const handleChange = (text) => (e) => {
//     setFormData({ ...formData, [text]: e.target.value });
//   };
  const handleChange = (event) => {
    setPass(event.target.value);
  };
  const sendPassword = async (event) => {
    event.preventDefault();
    const data = {
        token : token,
        password: pass,
    }
    const res = await authClientApi.reset(data);
    if (res.status === 200) navigate("/signin");
  };
  return (
    <>
      <p>token : {token}</p>
      <form>
        <input
          type="text"
          onChange={handleChange}
          value={pass}
        />
        <button onClick={sendPassword}>
          Send Password
        </button>
      </form>
      {/* <h2>Test Component</h2>
        <h1>User ID : {userDetails._id}</h1> */}
    </>
  );
}

export default Test;
