import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddEvent = () => {
    const { Formik } = formik;
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required('enter the title'),
        description: yup.string().required('enter the description'),
        location: yup.string().required('enter the location'),
        date: yup.string().required('enter the date'),
        time: yup.string().required('enter the time'),
      });     

      const SubmitForm = async (data)=>{

        try {
            const res = await axios.post('http://localhost:2000/addevent',{
                title:data.title,
                description:data.description,
                location:data.location,
                date:data.date,
                time:data.time,
            },{
                withCredentials:true
            })

            if(res.data.success){
                toast.success(res.data.message);
                // dispatch(sendLoginDetails(res.data.loggedInPerson))
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
                <div className='add-event-div'>
                    <Formik
                                                  validationSchema={schema}
                                                  onSubmit={SubmitForm}
                                                  initialValues={{
                                                    title: '',
                                                    description: '',
                                                    location:'',
                                                    date:'',
                                                    time:''
                                                  }}
                                                >
                                                  {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                    <Form noValidate onSubmit={handleSubmit}>
                                                      <div className='event-head'>
                                                          <h2>Add Event</h2>
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
                                                         <Link to={'/'}><Button>Cancel</Button></Link><Button type="submit">Confirm</Button>
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

export default AddEvent