import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";
// ...existing imports...
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}