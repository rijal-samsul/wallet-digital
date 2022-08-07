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
                <h2 style={{ textAlign:"center"}}>Login</h2>
                <Form>
                    <div className="mt-3 form">
                        <div>Email</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}
                        type="text"
                        className="mb-3 px-2 py-2 rounded"
                        />

                        <div>Password</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}
                        type="password"
                        className="mb-1 px-2 py-2 rounded"
                        />

                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <Button type="submit" className="btn btn-login" style={{ width: '100%', color: "white" }} variant="warning">
                        Login
                        </Button>
                    </div>
                </Form>
                <p style={{textAlign:"center"}}>Don't have an account? klik <span style={{ fontWeight: 'bold', cursor:'pointer' }} onClick={handleRegister}>here</span></p>
            </Modal.Body>
            <Register
                show={regShow}
                handleClose={handleRegClose}
            />
        </Modal>
    )
}