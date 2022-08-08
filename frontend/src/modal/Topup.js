import React, {useState} from "react";
import {Modal, Button, Form } from "react-bootstrap"

export default function Topup({show, handleClose}){
    const [topup, setTopupShow] = useState(false);
    const handleTopupClose = () => setTopupShow(false);
    const handleTopupShow = () => setTopupShow(true);
 
    return(
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Topup Saldo</Form.Label>
                    <Form.Control type="number"  />
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" >
                    Topup
                </Button>
            </Modal.Footer>
            
        </Modal>
    )
}