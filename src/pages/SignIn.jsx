import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowLeft } from "react-icons/fa";
import "./SignIn.css"; 
import logo from "../assets/images/dan-softwares.png"
import users from "../data/Users";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]= useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
   e.preventDefault();
   const user = users.find(
    (u) => u.email=== email && u.password === password  
   )
   if (user){
    setError("")
   navigate("/home");
   } else{
    setError("invalid email or password used!")
   }
  };

  return (
   
     <div className="back">
        <button
        className="back-btn"
        onClick={() => navigate("/")}
        aria-label="Go back"
      >
        <FaArrowLeft />
      </button>

    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
         {error && <p className="error">{error}</p>}
        <button type="submit" className="auth-btn">Sign In</button>
      </form>

      <div className="divider">OR</div>

      <div className="social-buttons">
        <button className="google-bttn">
          <FaGoogle className="icon" size={35} />
        </button>
        <button className="facebook-bttn">
          <FaFacebook className="icon" size={35} />
        </button>
      </div>

      <p className="auth-footer">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p> 
       <div className="logo-sexn">
              <img src={logo} alt="Dan-Softwares logo" className="logo-img" />
       </div>
    </div>
    </div>
  );
}
