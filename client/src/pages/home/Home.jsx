import React from 'react';
import "./Home.css";
import SignUp from "../../components/sign-up/signUp";

function Home() {
    return (
        <section className='home-container'>
            <div className='content-container'>
                <header className="content-header">
                <div className="logo"> Eco-Fit </div>
                    <p>Already have an account ? <span> Sign In</span></p>
                </header>
                <div className="outlet-container">
                    <SignUp/>
                </div>
            </div>
            <div className='image-container'></div>
        </section>
    );
}

export default Home;