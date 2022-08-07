import React from 'react'
import { useNavigate } from "react-router-dom"
import toggle from '../assets/justify.svg'

export default function Navbar() {
    // let navigate = useNavigate();
    // function gotoAbout(){
    //     navigate("/about")
    // }
    return (
        <nav>
            <input type='checkbox' id="check" />
            <label htmlFor="check" className='checkbtn'>
                <img src={toggle} />
            </label>
            <ul className=' mx-5'>
                <li><a href='#'>Home</a></li>
                <li><a href='/about'>About</a></li>
                <li><a href='#' className='auth '>Register</a></li>
            </ul>
        </nav>
    )
}
