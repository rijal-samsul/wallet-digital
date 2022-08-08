import { Modal, Button, Alert, Form } from "react-bootstrap"
import React, { useContext, useState } from "react"
import Register from "./Register";
import { useMutation } from 'react-query'
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";


export default function Login({show, handleClose}){
    const [regShow, setRegShow] = useState(false);
    const handleRegClose = () => setRegShow(false);
    const handleRegShow = () => setRegShow(true);

    const handleRegister = () => {
        handleRegShow();
    };

    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(UserContext)
    const [form, setForm] = useState({
        email: '',
        password: ''
    }) 
    
    const api = API()
    const navigate = useNavigate()

    const { email, password } = form

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
                    'Content-Type' : 'application/json'
                },
                body: body
            }

            const response = await api.post('/login', config)
            console.log(response)

            if (response.status === 'success') {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data
                })

                navigate('/profile')
            } else {
                const alert = (
                    <div className='alert alert-danger py-2 fw-bold' role='alert'>
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
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {message && message}
                <h2 style={{ textAlign:"center"}}>Login</h2>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="mt-3 form">
                        <div>Email</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}
                        type="email"
                        onChange={handleChange}
                        value={email}
                        name='email'
                        className="mb-3 px-2 py-2 rounded"
                        />

                        <div>Password</div>
                        <input
                        style={{ width: '100%', backgroundColor:"#F3F3F3", border:"1px solid #D2D2D2"}}
                        type="password"
                        onChange={handleChange}
                        value={password}
                        name='password'
                        className="mb-1 px-2 py-2 rounded"
                        />

                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <Button type='submit' className="btn btn-login" style={{ width: '100%', color: "white" }} variant="warning">
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