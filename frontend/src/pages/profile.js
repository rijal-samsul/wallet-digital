import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from '../component/navbar'
import user from '../assets/user.png'
import Topup from '../modal/Topup'
import { useParams } from 'react-router-dom'
import Transfers from '../modal/Transfer'
import { API } from '../config/api'
import rupiahFormat from 'rupiah-format';


export default function Profile() {

    let {id} = useParams()

    const title = 'Profile'
    document.title = 'Wallet Digital | ' + title

    const [myWallet, setmyWallet] = useState({})

    const [transfer, setTransfer] = useState(false)
    const closeTrans = () => setTransfer(false)

    const [topup, setTopupShow] = useState(false);
    const handleTopupClose = () => setTopupShow(false);
    const handleTopupShow = () => setTopupShow(true);

    const getMyWallet = async () => {
        try {
            const response = await API.get(`/wallet/${id}`)
            setmyWallet(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyWallet();
    }, []);
    

  return (
    <>
        <Navbar title={title} />
        <Container className='my-5'>
            <Row>
                <Col className='profile d-flex justify-content-center align-items-center mt-5 mx-5 py-5'>
                    <div>
                        <div>
                            <img
                                src={user}
                                alt='user img'
                                className='user-profile position-absolute top-10 start-50 translate-middle '
                            />
                        </div>
                        <div className='name d-flex align-items-center justify-content-center flex-column'>
                            <div className='h1'>{myWallet?.user?.name}</div>
                            <div className='h1' style={{color: '#F7A915'}}>{rupiahFormat.convert(myWallet?.saldo)}</div>
                        </div>
                        <div className='d-flex my-4 justify-content-center align-items-center'>
                            <button className='auth mx-3 px-5' onClick={() => setTopupShow(true)}>Top up</button>
                            <button className='auth mx-3 px-5' onClick={() => setTransfer(true)}>Transfer</button>
                        </div>
                    </div>
                    
                </Col>
            </Row>
            <Transfers
                transfer={transfer}
                closeTrans={closeTrans}
            />
            <Topup
                show={topup}
                handleClose={handleTopupClose}
            />
        </Container>
    </>
  )
}
