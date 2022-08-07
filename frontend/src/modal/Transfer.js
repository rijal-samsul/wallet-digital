import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function Transfers({ transfer, closeTrans }) {

    const [form, setForm] = useState({
        email: '',
        nominal: ''
    })

    const { email, nominal } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
  return (
    <Modal
        
        show={transfer}
        onHide={closeTrans}
        aria-labelledby='contained-modal-title-vcenter'
        centered
    >
        <Modal.Header closeButton /> 
        <Modal.Body
         className='mx-5 mb-4'
        >
            <div className='h2 mt-2 mb-5 fw-bold d-flex justify-content-center'>Transfer Saldo</div>
            <div>
                <form>
                    <div className='form-group mb-4'>
                        <label className='fw-bold mb-2'>Pilih Akun</label>
                        <input
                            type='email'
                            name='email'
                            className='form-control'
                            placeholder='email akun'
                            value={email}
                            onChange={handleChange}
                            autoComplete='off'
                            style={{background: 'rgba(210, 210, 210, 0.25)'}}
                        />
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
                        <button className='auth'>Transfer</button>
                    </div>
                </form>
            </div>
        </Modal.Body>
    </Modal>
  )
}
