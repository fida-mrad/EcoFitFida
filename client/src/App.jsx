import './App.css';
import Home from "./pages/home/Home";
import {Routes, Route, Link} from "react-router-dom";
import SignUp from "./components/sign-up/signUp";
import SignIn from "./components/sign-in/SignIn";

function App() {
    return (
        <main className="main-container">
           <Routes>
               <Route path="/" element={<Home/>}>
                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="sign-in"  element={<SignIn/>}/>
               </Route>
           </Routes>
        </main>
    );
}

export default App;
