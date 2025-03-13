import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container fluid>
        <Row>
            <Col lg={12} className='p-0'>
               <div className='footer'>
               <div className='footer-div'>
                    <h3>Event Management System</h3>    
                </div>
                <div className='about-div'>
                    <h4>About</h4>
                    <p>It is a Simple Event Management System.Here User Can Add their own events and manage it</p>
                </div>
               </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer