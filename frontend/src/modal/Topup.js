import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"
import { API } from '../config/api'
import { useMutation } from 'react-query';
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Topup({ show, handleClose }) {

    const [state] = useContext(UserContext)
    const [topup, setTopupShow] = useState(false);
    const handleTopupClose = () => setTopupShow(false);
    const handleTopupShow = () => setTopupShow(true);
    const [nominal, setNominal] = useState()

    const handleTopup = useMutation(async () => {

        try {
            let data = {
                nominal:nominal,
                email:state.user.email,
                name:state.user.name
            }

            const body = JSON.stringify(data);

            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.token,   
                    "Content-type": "application/json"
                }
            };
            
            const response = await API.post("/topup",body,config);
            console.log(response);

            const token = response.data.payment.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });

        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-sFeJI7TYqGZ8GKL-";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <select id="nominal" value={nominal} onChange={(e) => setNominal(e.target.value)}
                            className='form-select'
                            style={{ background: 'rgba(210, 210, 210, 0.25)' }}>
                            <option hidden selected>Topup Saldo</option>
                            <option  style={{ color: "white" }} value='20000' >20.000</option>
                            <option  style={{ color: "white" }} value='50000'>50.000</option>
                            <option  style={{ color: "white" }} value='100000'>100.000</option>
                            <option  style={{ color: "white" }} value='150000'>150.000</option>
                            <option  style={{ color: "white" }} value='300000'>300.000</option>
                            <option  style={{ color: "white" }} value='500000'>500.000</option>
                        </select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{ color: "white" }} variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={() => handleTopup.mutate()} style={{ color: "white" }} variant="warning" >
                    Top up
                </Button>
            </Modal.Footer>

        </Modal>
    )
}