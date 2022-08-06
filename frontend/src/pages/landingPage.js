import React from 'react'
import Navbar from '../component/navbar'
import { Col, Container, Row } from 'react-bootstrap'

import icon from '../assets/icon.png'

export default function LandingPage() {

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
                            <button className='auth px-5 mt-2'>Login</button>
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
            </Container>
        </>
    )
}
