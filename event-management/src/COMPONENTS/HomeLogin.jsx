import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomeLogin = () => {
    const loginDetails = useSelector((state)=>state.events.loginDetails);

  return (
    <Container fluid>
        <Row>
            <Col lg={12} className='p-0'>
                <div className='home-div'>
                        <div className='banner-quote'>
                        <h2>Creating Unforgettable Moments, <br /> One Event at a Time!</h2>
                        {
                            loginDetails.role === ('admin','user') ? (null):(<Link to='/login'> <Button variant='warning'> Sign In</Button></Link>)
                        }
                        </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default HomeLogin