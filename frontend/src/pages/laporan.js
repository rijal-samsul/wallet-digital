import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from '../component/navbar'
import { topup } from '../dummy/topup'
import { transData } from '../dummy/transfer'
import {API} from '../config/api'
import rupiahFormat from 'rupiah-format';
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'

export default function Laporan() {

    const title = 'Laporan'
    document.title = 'Wallet Digital | ' + title
    
    const [dataTopup, setdataTopup] = useState([])
    const [topUp, setTopUp] = useState(topup)
    const [transfer, setTransfer] = useState(transData)
    const [search, setSearch] = useState('')

    // GET DATA TRANSACTION DEFAULT
    const getMyWallet = async () => {
        try {
            const response = await API.get('/transactions')
            setdataTopup(response.data.transactions);
        } catch (error) {
            console.log(error);
        }
    }

    // FETCH DATA TRANSACTIONS
    const transactions = async () => {
        try {
            const response = await API.get('/trans')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
console.log(transfer)

    useEffect(() => {
        getMyWallet();
        transactions()
    }, []);

  return (
    <>
        <Navbar title={title} />
         <Container>
            <Row>
                <Col className='d-flex justify-content-center mt-5 py-3 px-0'>
                    <div style={{width: '100%'}}>
                        <div className='h2 fw-bold px-3 mb-4'>Laporan Transaksi</div>
                        <Row style={{background: '#F6F6F6', borderRadius: '40px'}} className='d-flex py-5 px-5 flex-column'>
                            <Col>
                                <div className='h3 fw-bold mx-3 mb-2'>Topup</div>
                                <div style={{background: '#E4E3E3', borderRadius: '10px', maxWidth: '520px'}} className='px-4 py-4'>
                                    {topUp?.length != 0 ? (
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Nominal</th>
                                                    <th>Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataTopup?.map((item, index) => (
                                                    <tr>
                                                        <td key={index}>{rupiahFormat.convert(item?.nominal)}</td>
                                                        <td>{moment(item?.createdAt).format('LL')}</td>
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
                                <div className='form-group mb-3 d-flex'>
                                    <input 
                                        className='form-control' 
                                        type='text' 
                                        style={{backgroundColor: '#E4E3E3', border: '1px solid #BCBCBC', color: '#000000', maxWidth: '400px', borderRight: 'none', borderTopRightRadius: '0',
                                        borderBottomRightRadius: '0'}} 
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Search...'  
                                        value={search}
                                    />
                                    {search.length === 0 ? (
                                        <SearchIcon 
                                            className='headerIcon px-1' 
                                            style={{fontSize: '40px'}}
                                            />
                                        ) : (
                                            <CloseIcon
                                            className='headerIcon px-1' 
                                            style={{fontSize: '40px'}}
                                            onClick={() => setSearch('')}
                                            />
                                    )}
                                </div>
                                <div style={{background: '#E4E3E3', borderRadius: '10px'}} className='px-4 py-5 table-responsive-lg'>
                                    {transfer?.length != 0 ? (
                                        <table className='table table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>Pengirim</th>
                                                    <th>Penerima</th>
                                                    <th colspan="2">Nominal</th>
                                                    <th>Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {transfer?.filter((item, index) => {
                                                    if (search === '') {
                                                        return <>
                                                        <tr key={index}>
                                                        <td>{item.pengirim}</td>
                                                        <td>{item.penerima}</td>
                                                        <td colspan="2">{item.nominal}</td>
                                                        <td>{item.tanggal}</td>
                                                        </tr>
                                                        </>
                                                    } else if (item.pengirim.toLowerCase().includes(search.toLowerCase())) {
                                                        return <>
                                                        <tr key={index}>
                                                        <td>{item.pengirim}</td>
                                                        <td>{item.penerima}</td>
                                                        <td colspan="2">{item.nominal}</td>
                                                        <td>{item.tanggal}</td>
                                                        </tr>
                                                        </>
                                                    }
                                                }).map((item, index) => (
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
