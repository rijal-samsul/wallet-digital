import React, { useState } from 'react'
import toggle from '../assets/justify.svg'
import Register from '../modal/Register';

export default function Navbar() {
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
                <img src={toggle} />
            </label>
            <ul className=' mx-5'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#' className='auth ' onClick={handleRegister}>Register</a></li>
            </ul>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </nav>
    )
}
