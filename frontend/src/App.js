import { Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./pages/landingPage";
import About from "./pages/About";
import Profile from "./pages/profile";
import Laporan from "./pages/laporan";
import { useContext, useEffect } from "react";

import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import PrivateRoute from "./component/privateRoute";

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth')
      if(response.status == 500){
        return dispatch({
          type:'LOGOUT'
        })
      }

      let payload = response.data.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload,
      })

    } catch (error) {
      navigate('/auth')
      
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <Routes>
      <Route path="/auth" element={<LandingPage/>} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/laporan" element={<Laporan />} />
      </Route>
    </Routes>
  );
}

export default App;
