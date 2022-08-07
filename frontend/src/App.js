import { Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./pages/landingPage";
import About from "./pages/About";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
