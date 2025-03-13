import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteEvents, editingEventDetails, sendAddedEvents } from '../Redux/slice'

const ViewAddedEvents = () => {

    const dispatch = useDispatch();
    const addedEvents = useSelector((state)=>state.events.addedEvents);

    useEffect(()=>{
        const viewAddedEvents = async () => {
            try {
                const res = await axios.get('http://localhost:2000/viewallevents',{
                    withCredentials:true
                })
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendAddedEvents(res.data.sameEvent));

                
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);

            }          

        }
        viewAddedEvents()
    },[dispatch])

    const deleteAddedEvents = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:2000/deleteevent/${id}`,{
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(deleteEvents(id));            
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
                           addedEvents.map((event)=>(
                            <Col lg={3} key={event._id}>
                                <div className='event-div'>
                                    <h2>

                                        <Link to='/updateevents'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16" onClick={()=>dispatch(editingEventDetails(event))}>
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        </Link>
                                    </h2>
                                     <h4>{event.title}</h4>
                                           
                                        <div className='eventDetails-div'>
                                            <div className='description-div'>
                                                <h5>Description</h5>
                                             <h3>{event.description}</h3>
                                            </div>
                                            <h6><span>Location</span><p>{event.location}</p></h6>
                                            <h6><span>Date</span><p>{event.date}</p></h6>
                                            <h6><span>Time</span><p>{event.time}</p></h6>
                                            <Button variant='danger' onClick={()=>deleteAddedEvents(event._id)}>Delete</Button>
                                        </div>
                                </div>
                            </Col>
                           )) 
                        }
        </Row>
    </Container>
  )
}

export default ViewAddedEvents