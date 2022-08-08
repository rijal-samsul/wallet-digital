import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"

import toggle from '../assets/justify.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import Register from '../modal/Register';
import Login from '../modal/Login';

export default function Navbar({title}) {

    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const closeRegister = () => setRegister(false)
    const closeLogin = () => setLogin(false)

    const handleLogin = () => {
        setLogin(true)
        setRegister(false)
    }
    const handleRegister = () => {
        setRegister(true)
        setLogin(false)
    }

    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        dispatch({
        type: 'LOGOUT'
        })
        navigate('/auth')
        console.log(state)
    }

    return (
        <nav>
            <input type='checkbox' id="check" />
            <label htmlFor="check" className='checkbtn'>
                <img src={toggle} alt="" />
            </label>
            <ul className=' mx-5'>
                {!state.isLogin ? (
                    <>
                        <li><Link to='/auth' className='text-navbar'>Home</Link></li>
                        <li><Link to='/about' className={title === 'About' ? `text-navbar-active` : `text-navbar`}>About</Link></li>
                        <li><a className='auth text-navbar' onClick={() => setRegister(true)}>Register</a></li>
                    
                    </>
                ) : (
                    <>
                        <li><Link to='/profile' className={title === 'Profile' ? `text-navbar-active` : `text-navbar`}>Profile</Link></li>
                        <li><Link to='/laporan' className={title === 'Laporan' ? `text-navbar-active` : `text-navbar`}>Laporan</Link></li>
                        <li><a onClick={logout} className='logout text-navbar'>Logout</a></li>
                    </>  
                )}
            </ul>
            <Register
                register={register}
                handleLogin={handleLogin}
                closeRegister={closeRegister}
            />
            <Login
                    login={login}
                    closeLogin={closeLogin}
                    handleRegister={handleRegister}
                />
        </nav>
    )
}
