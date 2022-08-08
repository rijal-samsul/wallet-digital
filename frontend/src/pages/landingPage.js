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
            <Container className='my-5 '>
                <Row className='mt-5'>
                    <Col md='6' >
                    <div className='d-flex flex-column justify-content-center '>
                        <div className='align-items-start mt-2'>
                            <div className='content'>Digital</div>
                            <div className='content mx-5' style={{color: '#F7A915'}}>Wallet</div>
                        </div>
                        <div className='context mt-4'>
                            <p>
                            E-wallet is a service that is electronic and serves to store data and payment instruments. With e-wallet, users can save their money to make financial transactions, both online and offline.
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
