import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from '../component/navbar'
import { topup } from '../dummy/topup'
import { transData } from '../dummy/transfer'

export default function Laporan() {

    const [topUp, setTopUp] = useState(topup)
    const [transfer, setTransfer] = useState(transData)

  return (
    <>
        <Navbar />
         <Container>
            <Row>
                <Col className='d-flex justify-content-center mt-5 py-3 px-0'>
                    <div>
                        <div className='h2 fw-bold px-3 mb-4'>Laporan Transaksi</div>
                        <Row style={{background: '#F6F6F6', borderRadius: '40px'}} className='d-flex py-5 px-5 flex-column'>
                            <Col>
                                <div className='h3 fw-bold mx-3 mb-2'>Topup</div>
                                <div style={{background: '#E4E3E3', borderRadius: '40px'}} className='px-4 py-4'>
                                    {topUp?.length != 0 ? (
                                        <table className='table table-borderless'>
                                            <thead>
                                                <tr>
                                                    <th>Nominal</th>
                                                    <th>Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topUp?.map((item, index) => (
                                                    <tr>
                                                        <td>{item.nominal}</td>
                                                        <td>{item.tanggal}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>       
                                    ) : (
                                        <div>
                                            <div className='mt-3'>No Data</div>
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col>
                                <div className='h3 fw-bold mx-3 mt-3 mb-2'>Transfer</div>
                                <div style={{background: '#E4E3E3', borderRadius: '40px'}} className='px-4 py-5 table-responsive-lg'>
                                    {transfer?.length != 0 ? (
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Pengirim</th>
                                                    <th>Penerima</th>
                                                    <th colspan="2">Nominal</th>
                                                    <th>Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transfer?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.pengirim}</td>
                                                        <td>{item.penerima}</td>
                                                        <td colspan="2">{item.nominal}</td>
                                                        <td>{item.tanggal}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>       
                                    ) : (
                                        <div>
                                            <div className='mt-3'>No Data</div>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
         </Container>
    </>
  )
}