import React from 'react'
import toggle from '../assets/justify.svg'

export default function Navbar() {
    return (
        <nav>
            <input type='checkbox' id="check" />
            <label htmlFor="check" className='checkbtn'>
                <img src={toggle} />
            </label>
            <ul className=' mx-5'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#' className='auth '>Register</a></li>
            </ul>
        </nav>
    )
}
