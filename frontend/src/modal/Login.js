import { Modal, Button, Alert, Form } from "react-bootstrap"
import React, { useContext, useState } from "react"
import { useMutation } from 'react-query'
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";


export default function Login({ login, closeLogin, handleRegister }){

    const [message, setMessage] = useState(null);
    const [state, dispatch] = useContext(UserContext)
    const [form, setForm] = useState({
        email: '',
        password: ''
    }) 
    
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
                headers: {
                    'Content-Type' : 'application/json'
                }
            }

            const response = await API.post('/login',body, config)

            if (response.status == 200) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })

                navigate(`/profile/${response.data.data.id}`)
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
        <Modal show={login} onHide={closeLogin} centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {message && message}
                <h2 style={{ textAlign:"center", fontWeight: "bold"}}>Login</h2>
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
                        <Button type='submit' className="auth" style={{ width: '100%', color: "white" }} variant="warning">
                        Login
                        </Button>
                    </div>
                </Form>
                <p style={{textAlign:"center", marginTop: '20px'}}>Don't have an account? klik <span style={{ fontWeight: 'bold', cursor:'pointer' }} onClick={handleRegister}>here</span></p>
            </Modal.Body>
        </Modal>
    )
}