// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components & Pages
import WelcomeScreen from "./components/WelcomeScreen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Today from "./pages/Today";
import ThisWeek from "./pages/ThisWeek";
import ThisMonth from "./pages/ThisMonth";
import Upcoming from "./pages/Upcoming";
import StickyWall from "./pages/StickyWall";
import Settings from "./pages/Settings";
import CalendarView from "./pages/CalendarView"

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Welcome page */}
        <Route path="/" element={<WelcomeScreen />} />

        {/* Auth route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main app after login */}
        <Route path="/home" element={<Home />}>
          <Route index element={<Upcoming />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="today" element={<Today />} />
          <Route path="week" element={<ThisWeek />} />
          <Route path="month" element={<ThisMonth />} />
          <Route path="calendarview" element={<CalendarView/>} />
          <Route path="sticky" element={<StickyWall />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
