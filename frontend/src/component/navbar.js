import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"

import toggle from '../assets/justify.svg'
import Register from '../modal/Register';
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext';

export default function Navbar({title}) {
    const [regShow, setRegShow] = useState(false);
    const handleRegClose = () => setRegShow(false);
    const handleRegShow = () => setRegShow(true);

    const handleRegister = () => {
        handleRegShow();
    };

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
                        <li><a className='auth text-navbar' onClick={handleRegister}>Register</a></li>
                    
                    </>
                ) : (
                    <>
                        <li><Link to='#' className={title === 'Profile' ? `text-navbar-active` : `text-navbar`}>Profile</Link></li>
                        <li><Link to='#' className={title === 'Laporan' ? `text-navbar-active` : `text-navbar`}>Laporan</Link></li>
                        <li><a onClick={logout} className='logout text-navbar'>Logout</a></li>
                    </>  
                )}
            </ul>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </nav>
    )
}
