
import React, { useState } from 'react'
import toggle from '../assets/justify.svg'
import Register from '../modal/Register';
import { Link } from 'react-router-dom'

export default function Navbar({title}) {
    const [regShow, setRegShow] = useState(false);
    const handleRegClose = () => setRegShow(false);
    const handleRegShow = () => setRegShow(true);

    const handleRegister = () => {
        handleRegShow();
    };

    return (
        <nav>
            <input type='checkbox' id="check" />
            <label htmlFor="check" className='checkbtn'>
                <img src={toggle} alt="" />
            </label>
            <ul className=' mx-5'>
                <li><Link to='/' className='text-navbar'>Home</Link></li>
                <li><Link to='#' className={title === 'About' ? `text-navbar-active` : `text-navbar`}>About</Link></li>                
                <li><Link to='#' className='auth text-navbar' onClick={handleRegister}>Register</Link></li>
            </ul>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </nav>
    )
}
