import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { emptyProfile, sendProfileDetails } from '../Redux/slice'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch()
    const profiledata = useSelector((state)=>state.events.ProfileDetails);
    const navigate = useNavigate()
    

    useEffect(()=>{
        const viewProfile = async ()=>{
            
           try {
            const res = await axios.get('http://localhost:2000/viewprofile',{
                withCredentials:true
            })

            
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(sendProfileDetails(res.data.findedUser))
                
            }else{
                toast.error(res.data.message);
            }
                              
           } catch (error) {
            toast.error(error.message);
           }
        }
        viewProfile()
    },[dispatch])

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
            <Col lg={12}>
                    <div className='profile-div'>
                            <div className='profile-details-div'>
                                <span className='topedit-icon'>
                                    <Link to='/editprofile'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </Link>
                                    </span>
                                <div className='img-div'>
                                    <img src={`http://localhost:2000/${profiledata.profileImage}`} alt="" />
                                    <h6>
                                        <Link to='/editprofileimage'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                        </Link>
                                    </h6>
                                    <h5>{profiledata.fullname}</h5>
                                </div>

                                <div className='details-div'>
                                    <h6><span>Email</span><p>{profiledata.email}</p></h6>
                                    <h6><span>Place</span><p>{profiledata.place}</p></h6>
                                </div>
                                <div className='profile-logout'>
                                <Button variant='danger' onClick={()=>logOut()}>LogOut</Button>
                                </div>
                            </div>
                    </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Profile