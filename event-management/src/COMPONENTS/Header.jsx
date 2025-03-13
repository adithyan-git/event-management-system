import axios from 'axios'
import React from 'react'
import { Button, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { emptyProfile } from '../Redux/slice'
import { toast } from 'react-toastify'

const Header = () => {

  const loginDetails = useSelector((state)=>state.events.loginDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async ()=>{
    try {
        const res = await axios.delete('http://localhost:2000/logout',{
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.message);
            dispatch(emptyProfile([]))
            navigate('/')
        }else{
            toast.error(res.data.message);
        }

    } catch (error) {
        toast.error(error.message);
    }

}

  return (
    <Container fluid>
        <Row>
            <Col lg={12} className='p-0'>
            <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand  >Event Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            {
              loginDetails.role === 'user' ? (        
                    <Nav.Link as={Link} to={'/addevents'}>Add Event</Nav.Link>
                 ):(
                  null
                 )
            }
            {
              loginDetails.role === 'user' ? ( <Nav.Link as={Link} to={'/viewaddedevent'}> View Event</Nav.Link>
              ):(null)
            }
            {
              loginDetails.role === 'admin' ? (<Nav.Link as={Link} to={'/viewalluser'}>All Users</Nav.Link>
              ):(null)
            }
            {
              loginDetails.role === 'admin' ? (<Nav.Link as={Link} to={'/viewuserallevents'}>User Events</Nav.Link>
              ):(null)
            }

          </Nav>
          <Form className="d-flex">
          <Nav.Link as={Link} to='/viewprofile'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square profile-icon" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
            </Nav.Link>  
            {
              loginDetails.length === 0 ? (           <Link to='/registration'> <Button variant="success" className='sign-up-btn'>Sign-Up</Button></Link>
              ):(<Button  className='sign-up-btn' onClick={()=>logOut()}  variant='danger'>Sign-Out</Button>)
            }
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </Col>
        </Row>
    </Container>
  )
}

export default Header