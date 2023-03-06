import React from 'react';
import "./Home.css";
import {Link, Outlet, useLocation} from "react-router-dom";

function Home() {
    const location = useLocation();
    return (
        <section className='home-container'>
            <div className='content-container'>
                <header className="content-header">
                    <div className="logo">Eco-Fit</div>
                    {location.pathname === "/sign-in" ? (
                        <p>
                            Don't have an account ?<Link className="link" to="/">Sign Up</Link>
                        </p>
                        ):(
                        <p>
                            Already have an account ? {""} <Link className="link" to="/sign-In"> Sign In</Link>
                        </p>
                    )}
                </header>
                <div className="outlet-container">
                    <Outlet/>
                </div>
            </div>
            <div className='image-container'></div>
        </section>

    );
}

export default Home;

