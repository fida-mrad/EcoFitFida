import "./App.css";
import "./scss/style.scss";
import Cookies from "js-cookie";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/Sign-In";
import SignUp from "./components/SignUp";
import AdminLayout from "./layout/AdminLayout";
import AgentSignin from "./views/pages/signin/AgentSignin";
import React, { useEffect, useState } from "react";
import ResetPassword from "./components/ResetPassword";
import Login from "./views/pages/login/Login";
import { authClientApi } from "./Services/Api";
import PrivateRoute from "./components/PrivateRoute";
import TestComp from "./components/Test";
import { ProvideClient } from "./ClientContext";
import { ProvideAgent } from "./AgentContext";
import ClientDetails from "./components/ClientDetails";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import PDetails from "./components/PDetails";
import ProductsList from "./components/ProductsList";
import NewHomePage from "./components/NewHomePage";
import MyAccount from "./components/MyAccount";
const AgentRegister = React.lazy(() =>
  import("./views/pages/register/AgentRegister")
);
const AgentLogin = React.lazy(() => import("./views/pages/login/AgentLogin"));
const AdminLogin = React.lazy(() => import("./views/pages/login/AdminLogin"));
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
function App() {
  return (
    // <ProvideClient>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route path="cart" element={<Cart />} /> */}
        {/* <Route path="account" element={<MyAccount />} /> */}
        {/* <Route path="productDetails" element={<ProductDetails />} /> */}
        <Route path="productDetails" element={<PDetails />} />
        {/* <Route path="test" element={<TestComp />} />
          <Route path="details" element={<ClientDetails />} /> */}
        <Route path="/client/*" element={<ClientRoutes />} />

        <Route
          exact
          path="/agentregister"
          name="Brand Agent Register Page"
          element={<AgentRegister />}
        />
        <Route
          exact
          path="/agentlogin"
          name="Agent SignIn Page"
          element={<AgentLogin />}
        />
        <Route
          exact
          path="/adminlogin"
          name="Admin SignIn Page"
          element={<AdminLogin />}
        />
        <Route
          exact
          path="/admin/*"
          name="Admin Layout"
          element={<AdminLayout />}
        />
        <Route path="/agent/*" name="Home" element={<DefaultLayout />} />
        <Route path="reset">
          <Route path=":token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </ProvideClient>
  );
}
function ClientRoutes() {
  return (
    <ProvideClient>
      <Routes>
        {/* <Route path="*" element={<HomePage />} /> */}
        <Route path="/details" element={<ClientDetails />} />
        <Route path="/test" element={<TestComp />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ProvideClient>
  );
}
function AgentRoutes() {
  return (
    <ProvideAgent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<ClientDetails />} />
        <Route path="/test" element={<TestComp />} />
      </Routes>
    </ProvideAgent>
  );
}

export default App;
