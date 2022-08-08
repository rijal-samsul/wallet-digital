import React, { useState } from 'react'
import Navbar from '../component/navbar'
import Login from '../modal/Login'
import Register from '../modal/Register'
import { Col, Container, Row } from 'react-bootstrap'

import icon from '../assets/icon.png'

export default function LandingPage() {

    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)
    const closeLogin = () => setLogin(false)
    const closeRegister = () => setRegister(false)

    const handleLogin = () => {
        setLogin(true)
        setRegister(false)
    }

    const handleRegister = () => {
        setRegister(true)
        setLogin(false)
    }
    
    return (
        <>
            <Navbar />
            <Container className='my-5'>
                <Row>
                    <Col md='6' >
                    <div className='d-flex flex-column justify-content-center '>
                        <div className='align-items-start mt-2'>
                            <div className='content'>Digital</div>
                            <div className='content mx-5' style={{color: '#F7A915'}}>Wallet</div>
                        </div>
                        <div className='context mt-4'>
                            <p>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                            </p>
                        </div>
                        <div>
                            <button className='auth px-5 mt-2' onClick={handleLogin} >Login</button>
                        </div>
                    </div>
                    </Col>
                    <Col md='6'>
                        <div className='column'>
                            <img
                                src={icon}
                                alt='icon'
                            />
                        </div>
                    </Col>
                </Row>
                <Login
                    login={login}
                    closeLogin={closeLogin}
                    handleRegister={handleRegister}
                />
                <Register
                    register={register}
                    handleLogin={handleLogin}
                    closeRegister={closeRegister}
                />
            </Container>
        </>
    )
}
