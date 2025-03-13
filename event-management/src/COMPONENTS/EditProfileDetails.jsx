import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { sendProfileUpdatedDetails } from '../Redux/slice';

const EditProfileDetails = () => {

            const { Formik } = formik;
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const profileDetails = useSelector((state)=>state.events.ProfileDetails)

                  const schema = yup.object().shape({
                         fullname: yup.string().required('enter the fullname'),
                        email: yup.string().required('enter the email'),
                        place: yup.string().required('enter the place'),
                       
                      });

                      
              const SubmitForm = async (data)=>{

                try {
                    const res = await axios.put('http://localhost:2000/updateprofile',{
                        fullname:data.fullname,
                        email:data.email,
                        place:data.place
                    },{
                        withCredentials:true
                    })

                    if(res.data.success){
                        toast.success(res.data.message);
                        dispatch(sendProfileUpdatedDetails(data))
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
                <div className='profile-edit-div'>
                                     <Formik
                                                  validationSchema={schema}
                                                  onSubmit={SubmitForm}
                                                  initialValues={{
                                                    fullname:profileDetails.fullname,
                                                    email:profileDetails.email,
                                                    place:profileDetails.place,
                                                  }}
                                                >
                                                  {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                    <Form noValidate onSubmit={handleSubmit}>
                                                      <div className='edit-head'>
                                                        <h2>Edit-Details</h2>
                                                      </div>
                                                         <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationFormik01">
                                                          <Form.Label>Fullname</Form.Label>
                                                          <Form.Control
                                                            type="text"
                                                            name="fullname"
                                                            placeholder='fullname....'
                                                            value={values.fullname}
                                                            onChange={handleChange}
                                                            isValid={touched.fullname && !errors.fullname}
                                                            isInvalid={errors.fullname}
                                                          />
                                                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                          <Form.Control.Feedback type='invalid'>{errors.fullname}</Form.Control.Feedback>
                                                        </Form.Group>
                    
                                                      </Row>
                                                      <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationFormik01">
                                                          <Form.Label>Email</Form.Label>
                                                          <Form.Control
                                                            type="text"
                                                            name="email"
                                                            placeholder='email....'
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isValid={touched.email && !errors.email}
                                                            isInvalid={errors.email}
                                                          />
                                                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                                        </Form.Group>
                    
                                                      </Row>
                                                      <Row className='mb-3'>
                                                      <Form.Group as={Col} md="12" controlId="validationFormik02">
                                                          <Form.Label>Place</Form.Label>
                                                          <Form.Control
                                                            type="text"
                                                            name="place"
                                                            placeholder='place....'
                                                            value={values.place}
                                                            onChange={handleChange}
                                                            isValid={touched.place && !errors.place}
                                                            isInvalid={errors.place}
                                            
                                                          />
                                            
                                                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                          <Form.Control.Feedback type='invalid'>{errors.place}</Form.Control.Feedback>
                                                        </Form.Group>
                                                      </Row>
                                                     
                                                      <div className='login-btn'>
                                                         <Link to={'/viewprofile'}><Button>Cancel</Button></Link><Button type="submit">Confirm</Button>
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

export default EditProfileDetails