import React from "react";
import Navbar from "../component/navbar";
import { Container, Row, Col } from "react-bootstrap"
import AboutIcon from "../assets/AboutIcon.png"

export default function About(){
    return(
        <>
            <Navbar />
            <h2 style={{marginTop:"1em", marginLeft:"3.5em"}}>About</h2>
            <Container className='containerAbout' fluid="lg">
                <Row>
                    <Col md="6">
                        <div className="firstColoumnAbout">
                            <p className='context'>
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful co In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
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