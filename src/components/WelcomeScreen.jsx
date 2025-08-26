import { Link } from "react-router-dom";
import logo from "../assets/images/dan-softwares.png"
import "./WelcomeScreen.css"

export default function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="logo-section">
        <img src={logo} alt="Dan-Softwares logo" className="logo-image" />
      </div>
      <div className="intro-section">
           <h1>Welcome to Dan to-do</h1>
           <p>
           Organize your tasks, boost your productivity, and stay on top of your goals with Dan to-do. Easily add, manage, and track your daily activities—all in one simple, intuitive app. 
           Let’s get started and make every day more productive!
           </p>
           <Link to="/signup" className="get-started-btn">Get Started</Link>
           <Link to="/signin" className="signin-link">Already have an account? Sign in</Link>
        </div>
    </div>
  );
}
