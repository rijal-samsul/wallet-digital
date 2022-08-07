import {Container, Row, Col, Modal, Form, Button } from "react-bootstrap"
import React, { useState } from "react";
import Login from "./Login"
import { API } from "../config/api";
import { useMutation } from 'react-query'

export default function Register({show, handleClose}){
    const [logShow, setLogShow] = useState(false);
    const handleLogClose = () => setLogShow(false);
    const handleLogShow = () => setLogShow(true);

    const handleLogin = () => {
        handleLogShow();
    };

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    })

    const api = API()
    const { email, password, name } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {

            e.preventDefault()

            const body = JSON.stringify(form)

            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            }

            const response = await api.post('/register', config)

            if (response.status === 'success') {
                const alert = (
                    <div className='alert alert-dark py-2 fw-bold' role='alert'>
                        Register Success
                    </div>
                )
                setMessage(alert)
                setForm({
                    name: '',
                    email: '',
                    password: ''
                })
            } else {
                const alert = (
                    <div className='alert alert-dark py-2 fw-bold' role='alert'>
                        {response.message} 
                    </div>
                )
            setMessage(alert)
            }
            
        } catch (error) {
            console.log(error)
            const alert = (
                <div className='alert alert-danger py-2 fw-bold' role='alert'>
                    Server Error
                </div>
            )
            setMessage(alert)
        }
    })    

    return(
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                {message && message}
                <h2 style={{ textAlign:"center"}}>Register</h2>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div>
                        <div>Full name</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={name}
                        className="mb-3 px-2 py-2 rounded"
                        />

                        <div>Email</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}                        
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        className="mb-3 px-2 py-2 rounded"
                        />

                        <div>Password</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}                        
                        type="password"
                        onChange={handleChange}
                        value={password}
                        name="password"
                        className="mb-1 px-2 py-2 rounded"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <Button type="submit" className="btn btn-login" style={{ width: '100%', color: "white" }} variant="warning">
                        Register
                        </Button>
                    </div>
                </Form>
                <p style={{textAlign:"center"}}>Already have an account? klik
                        <span style={{ fontWeight: 'bold', cursor:'pointer' }} onClick={handleLogin}> here</span>
                </p>
            </Modal.Body>
            <Login
                show={logShow}
                handleClose={handleLogClose}
            />
        </Modal>
    )
}
