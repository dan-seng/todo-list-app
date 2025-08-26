
import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css"
import logo from "../assets/images/dan-softwares.png"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted", formData);
      alert("Signed up succesfully")
      navigate("/signin");
      // send formData to backend later
    }
  };


  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
           {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        <div className="password-field">
           <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
           />
            <span className="toggle-icon" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
         
           {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
        <button type="submit" className="signup-btn">
        Sign Up
        </button>

        <div className="social-signup">
          <p>Or sign up with</p>
          <div className="icons">
            <button type="button" className="google-btn">
              <FaGoogle size={35} />
            </button>
            <button type="button" className="facebook-btn">
              <FaFacebook size={35} />
            </button>
          </div>

           <div className="logo-sexn">
              <img src={logo} alt="Dan-Softwares logo" className="logo-img" />
       </div>
        </div>
        
      </form>
    </div>
  );
}
