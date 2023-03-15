import './App.css';
import './scss/style.scss'
import Cookies from 'js-cookie';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/Sign-In";
import SignUp from "./components/SignUp";
import AdminLayout from './layout/AdminLayout'
import AgentSignin from './views/pages/signin/AgentSignin';
import React from 'react';
import LoginGoogle from './pages/login/LoginGoogle';
import Test from './components/Test';
const AgentRegister = React.lazy(() => import('./views/pages/register/AgentRegister'))
const AgentLogin = React.lazy(() => import('./views/pages/login/AgentLogin'))
const AdminLogin = React.lazy(() => import('./views/pages/login/AdminLogin'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<HomePage/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignUp/>}/>

                <Route exact path="/agentregister" name="Brand Agent Register Page" element={<AgentRegister />} />
            <Route exact path="/agentsignin" name="SignIn Page" element={<AgentSignin />} />
            <Route exact path="/agentlogin" name="Agent SignIn Page" element={<AgentLogin />} />
            <Route exact path="/adminlogin" name="Admin SignIn Page" element={<AdminLogin />} />
            <Route exact path="/admin/*" name="Admin Layout" element={<AdminLayout />} />
            <Route path="/agent/*" name="Home" element={<DefaultLayout />} />
            <Route path="reset">
            <Route path=":token" element={<Test />} />
            </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
