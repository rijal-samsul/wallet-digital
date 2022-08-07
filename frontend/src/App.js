
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/profile";
import LandingPage from "./pages/landingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage /> } />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
