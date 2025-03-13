import axios from 'axios'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deletedUser, sendAllUser, sendEditingUserValue } from '../Redux/slice'
import { Link } from 'react-router-dom'

const ViewAllUsers = () => {

    const dispatch = useDispatch()
    const allUser = useSelector((state)=>state.events.allUsers)
    useEffect(()=>{
        const allUser = async () => {
            try {
                const res = await axios.get('http://localhost:2000/viewallusers',{
                    withCredentials:true
                })
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendAllUser(res.data.allusers))
                }else{
                    toast.error(res.data.message);
                }                                 
            } catch (error) {
                toast.error(error.message);
            }
        }
        allUser()
    },[dispatch])

        const deleteUser = async (id) => {
            try {
                const res = await axios.delete(`http://localhost:2000/deleteuser/${id}`,{
                    withCredentials:true
                })
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(deletedUser(id))
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
                {
                    allUser.map((user)=>(
                        <Col lg={3} key={user._id}>
                    <div className='allUser-div'>
                        <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16" onClick={()=>deleteUser(user._id)}>
                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                        </svg>
                            <Link to='/edituserroleandstatus' onClick={()=>dispatch(sendEditingUserValue(user))}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                            </Link>
                        </h3>
                        <div className='img-user-div'> 
                            <img src={`http://localhost:2000/${user.profileImage}`} alt="" />
                        </div>
                        <div className='user-details'>
                            <h6><span>Name</span><p>{user.fullname}</p></h6>
                            <h6><span>Email</span><p>{user.email}</p></h6>
                            <h6><span>Place</span><p>{user.place}</p></h6>
                            <h6><span>Role</span><p>{user.role}</p></h6>
                            <h6><span>Status</span><p style={{color:user.status === 'active' ? 'green':'red'}}>{user.status}</p></h6>
                        </div>
                    </div>
                </Col>
                    ))
                }
            </Row>
    </Container>
  )
}

export default ViewAllUsers