import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/Sign-In";
import SignUp from "./components/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<HomePage/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
