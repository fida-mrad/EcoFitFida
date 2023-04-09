import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { clientController } from "../../services/coreApi";
import { useClient } from "../../ClientContext";

const MyAccount = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const [formFields, setformFields] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
  });
  const [clientState, setClientState] = useState(null);
  const { client, setClient } = useClient();
  useEffect(() => {
    console.log(client);
    if (client != null && client.status >= 400) {
      navigate("/login-register");
    } else {
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

  const updateClient = async (clientId) => {
    const data = {
      clientId: clientId,
      ...formFields,
    };
    const res = await clientController.updateClient(data);
    if (res.status === 201) {
      setClientState((prevState) => ({
        ...prevState,
        firstname: res?.data.firstname,
        lastname: res?.data.lastname,
        username: res?.data.username,
        phone: res?.data.phone,
      }));
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "My Account", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>My Account Information</h4>
                            <h5>Your Personal Details</h5>
                            {clientState && (
                              <p>Welcome : {clientState?.firstname}</p>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  onChange={handleChange("firstname")}
                                  value={formFields.firstname || ""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  onChange={handleChange("lastname")}
                                  value={formFields.lastname || ""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Username</label>
                                <input
                                  type="text"
                                  onChange={handleChange("username")}
                                  value={formFields.username || ""}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Telephone</label>
                                <input
                                  type="text"
                                  onChange={handleChange("phone")}
                                  value={formFields.phone || ""}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button
                                type="submit"
                                onClick={() => updateClient(client.data._id)}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Change Password</h4>
                            <h5>Your Password</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Current Password</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>New Password</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Password Confirm</label>
                                <input type="password" />
                                <i
                                  className="fa fa-eye"
                                  id="togglePassword"
                                  style={{
                                    position: "absolute",
                                    // right: "10px",
                                    top: "50%",
                                    // transform: "translateY(-50%)",
                                    cursor: "pointer",
                                  }}
                                  // onClick={handleTogglePassword}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span>3 .</span> Modify your address book entries
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Address Book Entries</h4>
                          </div>
                          <div className="entries-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-info text-center">
                                  <p>John Doe</p>
                                  <p>Paul Park </p>
                                  <p>Lorem ipsum dolor set amet</p>
                                  <p>NYC</p>
                                  <p>New York</p>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                <div className="entries-edit-delete text-center">
                                  <button className="edit">Edit</button>
                                  <button>Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Continue</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
