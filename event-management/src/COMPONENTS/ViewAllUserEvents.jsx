import axios from 'axios'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { sendUserAllEvents } from '../Redux/slice'

const ViewAllUserEvents = () => {

    const allUserEvents = useSelector((state)=>state.events.allUserEvents);
    const dispatch = useDispatch();

    useEffect(()=>{
        const viewAllEvents = async () => {
            try {
                const res = await axios.get('http://localhost:2000/viewalluserevents',{
                    withCredentials:true
                })
    
                if(res.data.success){
                    toast.success(res.data.message);
                    dispatch(sendUserAllEvents(res.data.allEvents))
                }else{
                    toast.error(res.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }                                                           

        }
        viewAllEvents()
    },[dispatch])
  return (
    <Container fluid>
        <Row>
            {
               allUserEvents.map((event)=>(
                <Col lg={3} key={event._id}>
                    <div className='event-div'>
                            <h4>{event.title}</h4>
                               
                            <div className='eventDetails-div'>
                                <div className='description-div'>
                                    <h5>Description</h5>
                                 <h3>{event.description}</h3>
                                </div>
                                <h6><span>Location</span><p>{event.location}</p></h6>
                                <h6><span>Date</span><p>{event.date}</p></h6>
                                <h6><span>Time</span><p>{event.time}</p></h6>

                            </div>
                    </div>
                </Col>
               )) 
            }
        </Row>
    </Container>
  )
}

export default ViewAllUserEvents