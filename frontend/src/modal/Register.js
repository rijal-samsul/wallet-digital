import {Container, Row, Col, Modal, Form, Button } from "react-bootstrap"
import React, { useState } from "react";
import Login from "./Login"

export default function Register({show, handleClose}){
    const [logShow, setLogShow] = useState(false);
    const handleLogClose = () => setLogShow(false);
    const handleLogShow = () => setLogShow(true);

    const handleLogin = () => {
        handleLogShow();
    };

    const [message, setMessage] = useState(null);

    return(
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {message && message}
                <h2 style={{color:"yellow", textAlign:"center"}}>Register</h2>
                <Form>
                    <div>
                        <div>Full name</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#D2D2D2" }}
                        type="text"
                        name="email"
                        className="mb-3 px-2 py-2"
                        />

                        <div>Email</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#D2D2D2" }}
                        type="text"
                        name="email"
                        className="mb-3 px-2 py-2"
                        />

                        <div>Password</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#D2D2D2" }}
                        type="text"
                        name="email"
                        className="mb-1 px-2 py-2"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <Button type="submit" className="btn btn-login" style={{ width: '100%' }} variant="warning">
                        Register
                        </Button>
                    </div>
                </Form>
                <p style={{textAlign:"center"}}>Already have an account? klik
                        <a style={{ fontWeight: 'bold' }} onClick={handleLogin}> here</a>
                </p>
            </Modal.Body>
            <Login
                show={logShow}
                handleClose={handleLogClose}
            />
        </Modal>
    )
}
