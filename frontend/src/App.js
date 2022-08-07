import { Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./pages/landingPage";
import About from "./pages/About";
import Profile from "./pages/profile";
import Laporan from "./pages/laporan";
import { useContext, useEffect } from "react";

import { UserContext } from "./context/userContext";
import { API } from "./config/api";
import PrivateRoute from "./component/privateRoute";


function App() {

  const [state, dispatch] = useContext(UserContext)
  const api = API()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.isLogin) {
      navigate('/auth')
    } else {
      if (state.user.status === 'success') {
        navigate('/profile')
      } 
    }
  }, [state])

  return (
    <Routes>
      <Route path="/auth" element={<LandingPage/>} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/laporan" element={<Laporan />} />
      </Route>
    </Routes>
  );
}

export default App;
