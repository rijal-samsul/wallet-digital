import React from "react";
import Navbar from "../component/navbar";
import { Container, Row, Col } from "react-bootstrap"
import AboutIcon from "../assets/AboutIcon.png"

export default function About(){

    const title = 'About'
    document.title = 'Wallet Digital | ' + title

    return(
        <>
            <Navbar />
            <h2 style={{marginTop:"1em", marginLeft:"3.5em"}}>About</h2>
            <Container className='containerAbout' fluid="lg">
                <Row>
                    <Col md="6">
                        <div className="firstColoumnAbout">
                            <p className='context'>
                            E-wallet is a service that is electronic and serves to store data and payment instruments. With e-wallet, users can save their money to make financial transactions, both online and offline. Basically, an e-wallet functions like a physical wallet that can be used to make secure payments. If you use an e-wallet, someone can make cashless payments when they want to pay for food, airline tickets, cinema tickets, and online shopping.
                            </p>
                        </div>
                    </Col >     
                        
                    <Col md="6">
                        <div className="secondColoumnAbout">
                            <img src={AboutIcon} alt="icon-about" />
                        </div>
                    </Col>
                </Row>
            </Container>
        
        </>
    )
}