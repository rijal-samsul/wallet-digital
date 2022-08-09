import React, {useState} from "react";
import {Modal, Button, Form } from "react-bootstrap"
import { API } from '../config/api'
import { useMutation } from 'react-query';

export default function Topup({show, handleClose}){
    const [topup, setTopupShow] = useState(false);
    const handleTopupClose = () => setTopupShow(false);
    const handleTopupShow = () => setTopupShow(true);

    const [form, setForm] = useState({ saldo: "" });
    
    const { saldo } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleTopup = useMutation(async (e) => {
        try {
            e.preventDefault();
            const body = JSON.stringify(form);
            // Configuration
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            // Insert transaction data
            const response = await API.patch('/wallet',body, config);
            if(response.status == 200){
                setTopupShow(false)
            }
        } catch (error) {
            console.log(error);
        }
    });
 
    return(
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Top up Saldo</Form.Label>
                    <Form.Control name="saldo" type="number" onChange={handleChange} />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"white"}} variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button style={{color:"white"}} onClick={(e) => handleTopup.mutate(e)} variant="warning" >
                    Top up
                </Button>
            </Modal.Footer>
            
        </Modal>
    )
}