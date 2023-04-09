import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import { useClient } from "../ClientContext";
import { useNavigate } from "react-router-dom";
import { authClientApi, clientController } from "../Services/Api";
import { CAlert } from "@coreui/react";
function MyAccount() {
  const navigate = useNavigate();
  const defaultFormFields = {
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
  };
  const [formFields, setformFields] = useState(defaultFormFields);
  const [clientState, setClientState] = useState(null);
  const [passwordChangeFields, setPasswordChangeFields] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState({
    show: false,
    msg: "",
  });
  const { client, setClient } = useClient();
  useEffect(() => {
    if (client != null && client.status >= 400) {
      navigate("/signin");
    } else {
      // console.log("client?.data : ");
      // console.log(client?.data);
      setformFields((prevState) => ({
        ...prevState,
        firstname: client?.data.firstname,
        lastname: client?.data.lastname,
        username: client?.data.username,
        phone: client?.data.phone,
      }));
      setClientState((prevState) => ({
        ...prevState,
        firstname: client?.data.firstname,
        lastname: client?.data.lastname,
        username: client?.data.username,
        phone: client?.data.phone,
      }));
    }
  }, [client]);
  const handleChange = (text) => (e) => {
    setformFields({ ...formFields, [text]: e.target.value });
  };
  const handlePasswordChangeFiels = (text) => (e) => {
    setPasswordChangeFields({
      ...passwordChangeFields,
      [text]: e.target.value,
    });
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const updateClient = async (clientId) => {
    const data = {
      clientId: clientId,
      ...formFields,
    };
    // console.log(data);
    const res = await clientController.updateClient(data);
    if (res.status === 201) {
      // console.log("Res : ");
      // console.log(res);
      // await setClient(res)
      setClientState((prevState) => ({
        ...prevState,
        firstname: res?.data.firstname,
        lastname: res?.data.lastname,
        username: res?.data.username,
        phone: res?.data.phone,
      }));
    }
  };
  const changePassword = async () => {
    const res = await authClientApi.changePassword(passwordChangeFields);
    if (res.status === 201) {
      setshowSuccessAlert(true);
      setTimeout(() => {
        setshowSuccessAlert((prev) => !prev);
      }, 1500);
    } else {
      setDangerAlert({
        show: true,
        msg: res.data.msg,
      });
      setTimeout(() => {
        setDangerAlert((prevState) => ({
          ...prevState,
          show: !prevState.show,
        }));
      }, 3000);
    }
  };
  return (
    <>
      <NavBar />
      {/* <!-- My Account Start --> */}
      <div className="my-account">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="dashboard-nav"
                  data-toggle="pill"
                  href="#dashboard-tab"
                  role="tab"
                >
                  <i className="fa fa-tachometer-alt"></i>Dashboard
                </a>
                <a
                  className="nav-link"
                  id="orders-nav"
                  data-toggle="pill"
                  href="#orders-tab"
                  role="tab"
                >
                  <i className="fa fa-shopping-bag"></i>Orders
                </a>
                <a
                  className="nav-link"
                  id="payment-nav"
                  data-toggle="pill"
                  href="#payment-tab"
                  role="tab"
                >
                  <i className="fa fa-credit-card"></i>Payment Method
                </a>
                <a
                  className="nav-link"
                  id="address-nav"
                  data-toggle="pill"
                  href="#address-tab"
                  role="tab"
                >
                  <i className="fa fa-map-marker-alt"></i>Address
                </a>
                <a
                  className="nav-link"
                  id="account-nav"
                  data-toggle="pill"
                  href="#account-tab"
                  role="tab"
                >
                  <i className="fa fa-user"></i>Account Details
                </a>
                <a className="nav-link" href="index.html">
                  <i className="fa fa-sign-out-alt"></i>Logout
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="dashboard-tab"
                  role="tabpanel"
                  aria-labelledby="dashboard-nav"
                >
                  <h4>Dashboard</h4>
                  {/* {client && <p>Welcome(client) : {client?.data.firstname}</p>} */}
                  {clientState && (
                    <p>Welcome(clientState) : {clientState?.firstname}</p>
                  )}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    condimentum quam ac mi viverra dictum. In efficitur ipsum
                    diam, at dignissim lorem tempor in. Vivamus tempor hendrerit
                    finibus. Nulla tristique viverra nisl, sit amet bibendum
                    ante suscipit non. Praesent in faucibus tellus, sed gravida
                    lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu
                    rhoncus scelerisque.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="orders-tab"
                  role="tabpanel"
                  aria-labelledby="orders-nav"
                >
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>No</th>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Product Name</td>
                          <td>01 Jan 2020</td>
                          <td>$99</td>
                          <td>Approved</td>
                          <td>
                            <button className="btn">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Product Name</td>
                          <td>01 Jan 2020</td>
                          <td>$99</td>
                          <td>Approved</td>
                          <td>
                            <button className="btn">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Product Name</td>
                          <td>01 Jan 2020</td>
                          <td>$99</td>
                          <td>Approved</td>
                          <td>
                            <button className="btn">View</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="payment-tab"
                  role="tabpanel"
                  aria-labelledby="payment-nav"
                >
                  <h4>Payment Method</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    condimentum quam ac mi viverra dictum. In efficitur ipsum
                    diam, at dignissim lorem tempor in. Vivamus tempor hendrerit
                    finibus. Nulla tristique viverra nisl, sit amet bibendum
                    ante suscipit non. Praesent in faucibus tellus, sed gravida
                    lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu
                    rhoncus scelerisque.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="address-tab"
                  role="tabpanel"
                  aria-labelledby="address-nav"
                >
                  <h4>Address</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Payment Address</h5>
                      <p>123 Payment Street, Los Angeles, CA</p>
                      <p>Mobile: 012-345-6789</p>
                      <button className="btn btn-danger">Edit Address</button>
                    </div>
                    <div className="col-md-6">
                      <h5>Shipping Address</h5>
                      <p>123 Shipping Street, Los Angeles, CA</p>
                      <p>Mobile: 012-345-6789</p>
                      <button className="btn btn-danger">Edit Address</button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="account-tab"
                  role="tabpanel"
                  aria-labelledby="account-nav"
                >
                  <h4>Account Details</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange("firstname")}
                        value={formFields.firstname || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange("lastname")}
                        value={formFields.lastname || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mobile"
                        onChange={handleChange("phone")}
                        value={formFields.phone || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        onChange={handleChange("username")}
                        value={formFields.username || ""}
                      />
                    </div>
                    {/* <div className="col-md-12">
                                        <input className="form-control" type="text" placeholder="Address"/>
                                    </div> */}
                    <div className="col-md-12">
                      <button
                        className="btn btn-danger"
                        onClick={() => updateClient(client.data._id)}
                      >
                        Update Account
                      </button>
                      <br />
                    </div>
                  </div>
                  <h4 className="mt-2">Password change</h4>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Current Password"
                        onChange={handlePasswordChangeFiels("currentPassword")}
                        value={passwordChangeFields.currentPassword || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="New Password"
                        onChange={handlePasswordChangeFiels("newPassword")}
                        value={passwordChangeFields.newPassword || ""}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                      />
                    </div>
                    <div className="col-md-12">
                      <button
                        className="btn btn-danger"
                        disabled={
                          passwordChangeFields.newPassword !== confirmPassword
                        }
                        onClick={changePassword}
                      >
                        Save Changes
                      </button>
                    </div>
                    {showSuccessAlert && (
                      <CAlert color="success" className="mt-2">
                        Password Changed successfully
                      </CAlert>
                    )}
                    {dangerAlert.show && (
                      <CAlert color="danger" className="mt-2">{dangerAlert.msg}</CAlert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- My Account End --> */}
      <Footer></Footer>
    </>
  );
}

export default MyAccount;
