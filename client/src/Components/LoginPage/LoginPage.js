import React, { useContext } from 'react';
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const LoginPage = ({ switchToSignup }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            // Update AuthContext
            login(res.data.user);
            localStorage.setItem("userId", res.data.user.id);
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data || err);
        }
    };

    return (
        <div id='login-page'>
            <form onSubmit={handleLogin} autoComplete='off'>
                <div id='login-page-container'>
                    <div id='login_box'>
                        <p id='login_head'>Continue Your Journey !</p>
                        <p id='login_username'>
                            USERNAME : <input type='text' name='username' required placeholder="Enter Your username" />
                        </p>
                        <p id='login_password'>
                            PASSWORD : <input type='password' name='password' required placeholder="Enter Your password" />
                        </p>
                        <button id='login_btn' type='submit'>LOG IN</button>
                        <a href='/guest_editor' id='ide_login'>USE IDE AS GUEST</a>
                    </div>
                </div>
            </form>
            <button type="button" onClick={switchToSignup} id="signup_txt">
                Don't have an account? Signup
            </button>
        </div>
    );
};

export default LoginPage;
