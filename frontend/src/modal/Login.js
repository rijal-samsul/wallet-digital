import { Modal, Button, Alert, Form } from "react-bootstrap"
import React, { useState } from "react"
import Register from "./Register";


export default function Login({show, handleClose}){
    const [regShow, setRegShow] = useState(false);
    const handleRegClose = () => setRegShow(false);
    const handleRegShow = () => setRegShow(true);

    const handleRegister = () => {
        handleRegShow();
    };

    const [message, setMessage] = useState(null);

    return(
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {message && message}
                <h2 style={{color:"yellow", textAlign:"center"}}>Login</h2>
                <Form>
                    <div className="mt-3 form">
                        <div>Email</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#D2D2D2" }}
                        type="text"
                        className="mb-3 px-2 py-2"
                        />

                        <div>Password</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#D2D2D2" }}
                        type="text"
                        className="mb-1 px-2 py-2"
                        />

                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <Button type="submit" className="btn btn-login" style={{ width: '100%' }} variant="warning">
                        Login
                        </Button>
                    </div>
                </Form>
                <p style={{textAlign:"center"}}>Don't have an account? klik <a style={{ fontWeight: 'bold' }} onClick={handleRegister}>here</a></p>
            </Modal.Body>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </Modal>
    )
}