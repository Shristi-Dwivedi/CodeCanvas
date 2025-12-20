import React, { useState } from 'react'
import "./Welcome.css"
import bg from "../../Images/bgVideo.mp4"
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';

const Welcome = () => {
    // false = show intro screen first
    const [showAuth, setShowAuth] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className='main_page_cnt'>
            <div className='bgvid_container'>
                <video src={bg} autoPlay muted loop playsInline></video>
            </div>

            <div className="container welcome-container">
                {!showAuth ? (
                    <div className="intro-box">
                        <h1 className="welcome-title">CodeCanvas</h1>
                        <p className="welcome-about">
                            Life's too short for bad code — every Hello World comes with a side of surprises.
                        </p>
                        <button
                            className="get-started-btn"
                            onClick={() => setShowAuth(true)}
                        >
                            Let's Code
                        </button>
                    </div>
                ) : (
                    <div className={`welcomeBox ${showAuth ? "fade-in" : ""}`}>
                        {showLogin ? (
                            <LoginPage switchToSignup={() => setShowLogin(false)} />
                        ) : (
                            <SignupPage switchToLogin={() => setShowLogin(true)} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Welcome