import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { updateEvent } from '../Redux/slice';

const UpdateEvents = () => {

    const { Formik } = formik;

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const editValue = useSelector((state)=>state.events.eventValue)

        const schema = yup.object().shape({
                title: yup.string().required('enter the title'),
                description: yup.string().required('enter the description'),
                location: yup.string().required('enter the location'),
                date: yup.string().required('choose the date'),
                time: yup.string().required('choose the time '),
              });

              const SubmitForm = async (data)=>{

                try {
                    const res = await axios.put(`http://localhost:2000/updateevent/${editValue._id}`,{
                        title:data.title,
                        description:data.description,
                        location:data.location,
                        date:data.date,
                        time:data.time,
                    },{
                        withCredentials:true
                    })

                    const details = {
                        id:editValue._id,
                        title:data.title,
                        description:data.description,
                        location:data.location,
                        date:data.date,
                        time:data.time,
                    }
                    if(res.data.success){
                        toast.success(res.data.message);
                        dispatch(updateEvent(details))
                        navigate('/viewaddedevent')
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
                    <div className='update-event'>
                         <Formik
                                                                          validationSchema={schema}
                                                                          onSubmit={SubmitForm}
                                                                          initialValues={{
                                                                            title: editValue.title,
                                                                            description: editValue.description,
                                                                            location:editValue.location,
                                                                            date:editValue.date,
                                                                            time:editValue.time
                                                                          }}
                                                                        >
                                                                          {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                                            <Form noValidate onSubmit={handleSubmit}>
                                                                              <div className='update-head'>
                                                                                 <h2>Update-Event</h2>
                                                                              </div>
                                                                              <Row className="mb-3">
                                                                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                                                                  <Form.Label>Title</Form.Label>
                                                                                  <Form.Control
                                                                                    type="text"
                                                                                    name="title"
                                                                                    placeholder='title....'
                                                                                    value={values.title}
                                                                                    onChange={handleChange}
                                                                                    isValid={touched.title && !errors.title}
                                                                                    isInvalid={errors.title}
                                                                                  />
                                                                                  <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                                  <Form.Control.Feedback type='invalid'>{errors.title}</Form.Control.Feedback>
                                                                                </Form.Group>
                                            
                                                                             
                                                                              <Form.Group as={Col} md="4" controlId="validationFormik02">
                                                                                  <Form.Label>Description</Form.Label>
                                                                                  <Form.Control
                                                                                    type="text"
                                                                                    name="description"
                                                                                    placeholder='description....'
                                                                                    value={values.description}
                                                                                    onChange={handleChange}
                                                                                    isValid={touched.description && !errors.description}
                                                                                    isInvalid={errors.description}
                                                                    
                                                                                  />
                                                                    
                                                                                  <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                                  <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                                                                                </Form.Group>
                                                                            
                                                                              <Form.Group as={Col} md="4" controlId="validationFormik02">
                                                                                  <Form.Label>Location</Form.Label>
                                                                                  <Form.Control
                                                                                    type="text"
                                                                                    name="location"
                                                                                    placeholder='location....'
                                                                                    value={values.location}
                                                                                    onChange={handleChange}
                                                                                    isValid={touched.location && !errors.location}
                                                                                    isInvalid={errors.location}
                                                                    
                                                                                  />
                                                                    
                                                                                  <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                                  <Form.Control.Feedback type='invalid'>{errors.location}</Form.Control.Feedback>
                                                                                </Form.Group>
                                                                              </Row>
                                                                              <Row className='mb-3'>
                                                                              <Form.Group as={Col} md="12" controlId="validationFormik02">
                                                                                  <Form.Label>Date</Form.Label>
                                                                                  <Form.Control
                                                                                    type="date"
                                                                                    name="date"
                                                                                    value={values.date}
                                                                                    onChange={handleChange}
                                                                                    isValid={touched.date && !errors.date}
                                                                                    isInvalid={errors.date}
                                                                    
                                                                                  />
                                                                    
                                                                                  <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                                  <Form.Control.Feedback type='invalid'>{errors.date }</Form.Control.Feedback>
                                                                                </Form.Group>
                                                                              </Row>
                                                                              <Row className='mb-3'>
                                                                              <Form.Group as={Col} md="12" controlId="validationFormik02">
                                                                                  <Form.Label>Time</Form.Label>
                                                                                  <Form.Control
                                                                                    type="time"
                                                                                    name="time"
                                                                                    placeholder='time....'
                                                                                    value={values.time}
                                                                                    onChange={handleChange}
                                                                                    isValid={touched.time && !errors.time}
                                                                                    isInvalid={errors.time}
                                                                    
                                                                                  />
                                                                    
                                                                                  <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                                  <Form.Control.Feedback type='invalid'>{errors.time}</Form.Control.Feedback>
                                                                                </Form.Group>
                                                                              </Row>
                                                                             
                                                                              <div className='login-btn'>
                                                                                 <Link to={'/viewaddedevent'}><Button>Cancel</Button></Link><Button type="submit">Confirm</Button>
                                                                              </div>
                                                                            </Form>
                                                                          )}
                                                                </Formik>
                    </div>
            </Col>
        </Row>
    </Container>
  )
}

export default UpdateEvents