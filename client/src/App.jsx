import './App.css';
import Home from "./pages/home/Home";
import {Routes, Route, Link} from "react-router-dom";
import SignUp from "./components/sign-up/signUp";
import SignIn from "./components/sign-in/SignIn";
import LoginFacebook from './pages/login/LoginFacebook';

function App() {
    return (
        <main className="main-container">
           <Routes>
                <Route path="/" element={<Home/>}>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="sign-in"  element={<SignIn/>}/>
                <Route path="login-facebook" element={<LoginFacebook/>}/>
            </Route>
           </Routes>
        </main>
    );
}

export default App;
