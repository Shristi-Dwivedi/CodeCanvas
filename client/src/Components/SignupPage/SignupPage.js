import React, { useState } from 'react'
import "./SignupPage.css"


const SignupPage = ({switchToLogin}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ name: "", email: "", username: "", password: "" });
      }
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Signup failed!");
    }
  };
  return (
    <>
      <div id='signup-page-container'>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div id='signup_box'>
            <p id='signup_head'>Signup & Enter In World of Errors !</p>
            <p id='signup_name'>NAME : <input type='text' name='name' required value={formData.name}
              onChange={handleChange}placeholder='Enter Your Name'></input></p>
            <p id='signup_email'>EMAIL ID : <input type='email' name='email' required value={formData.email}
              onChange={handleChange}placeholder='Enter Your Email'></input></p>
            <p id='signup_username'>USERNAME : <input type='text' name='username' required value={formData.username}
              onChange={handleChange}placeholder='Enter Your UserName'></input></p>
            <p id='signup_password'>PASSWORD : <input type='password' name='password' required value={formData.password}
              onChange={handleChange}placeholder='Enter Your Password'></input></p>
            <button id='signup_btn' type='submit'>SIGN UP</button>
            <a href='/' id='ide_signup'>USE IDE AS GUEST</a>
          </div>
        </form>
        <button type="button" onClick={switchToLogin} id="login_txt">
          Already have an account? Login
        </button>
      </div>
    </>
  )
}

export default SignupPage