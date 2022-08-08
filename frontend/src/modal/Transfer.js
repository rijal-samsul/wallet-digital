import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import {API} from '../config/api'
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';

export default function Transfers({ transfer, closeTrans }) {

    const [form, setForm] = useState({
        nominal: ''
    })

    const [state, dispatch] = useContext(UserContext)

    const [selected, setSelected] = useState({})

    const [wallets, setWallets] = useState([])

    const getWallets = async () => {
        try {
            const response = await API.get('/wallets')
            setWallets(response.data.wallets);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWallets();
    }, []);

    const { nominal } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelected = (item) => {
        setSelected(item)
    }

    
    let data = {
        sender: state.user.id,
        receiver: selected.id,
        nominal:form.nominal
    }
    const handleTransfer = useMutation(async (e) => {
        try {
            e.preventDefault();
            const body = JSON.stringify(data);
            // Configuration
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            // Insert transaction data
            const response = await API.post('/transaction',body, config);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    });
    
    return (
    <Modal
        
        show={transfer}
        onHide={closeTrans}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Header closeButton /> 
        <Modal.Body
        className='mx-3 mb-4'
        >
            <div className='h2 mt-2 mb-5 fw-bold d-flex justify-content-center'>Transfer Saldo</div>
            <div>
                <form>
                    <div className='form-group mb-4'>
                        <label className='fw-bold mb-2'>Pilih Akun</label>
                        <select
                            className='form-select'
                            style={{background: 'rgba(210, 210, 210, 0.25)'}}
                        >
                            <option selected>email akun</option>
                            {wallets.map((item, index) => (
                                <option onClick={()=> handleSelected(item)} style={{color:"white"}} key={index} >{item?.email}</option>
                            ))}
                            {/* <option>{item.email}</option> */}
                        </select>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='fw-bold mb-2'>Nominal</label>
                        <input
                            type='number'
                            name='nominal'
                            className='form-control'
                            placeholder='jumlah transfer'
                            value={nominal}
                            onChange={handleChange}
                            autoComplete='off'
                            style={{background: 'rgba(210, 210, 210, 0.25)'}}
                        />
                    </div>
                    <div className='d-grid my-5'>
                        <button onClick={(e) => handleTransfer.mutate(e)} className='auth'>Transfer</button>
                    </div>
                </form>
            </div>
        </Modal.Body>
    </Modal>
  )
}
