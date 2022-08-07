import { Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./pages/landingPage";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
