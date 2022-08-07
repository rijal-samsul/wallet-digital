import React, { useContext } from 'react'
import toggle from '../assets/justify.svg'
import { Link } from 'react-router-dom'

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
                {/* {!state ? (
                    <> */}
                        <li><Link to='/' className='text-navbar'>Home</Link></li>
                        <li><Link to='#' className={title === 'About' ? `text-navbar-active` : `text-navbar`}>About</Link></li>
                        <li><Link to='#' className='auth text-navbar'>Register</Link></li>
                    {/* </>
                ) : ( */}
                    {/* <>
                        <li><Link to='#' className={title === 'Profile' ? `text-navbar-active` : `text-navbar`}>Profile</Link></li>
                        <li><Link to='#' className={title === 'Laporan' ? `text-navbar-active` : `text-navbar`}>Laporan</Link></li>
                        <li><Link to='#' className='logout text-navbar'>Logout</Link></li>
                    </> */}
                {/* )} */}    
            </ul>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </nav>
    )
}
