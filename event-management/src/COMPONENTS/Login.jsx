import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { sendLoginDetails } from '../Redux/slice';

const Login = () => {

        const { Formik } = formik;
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const schema = yup.object().shape({
                email: yup.string().required('enter the email'),
                password: yup.string().required('enter the password'),
               
              });

              const SubmitForm = async (data)=>{

                try {
                    const res = await axios.post('http://localhost:2000/personlogin',{
                        email:data.email,
                        password:data.password
                    },{
                        withCredentials:true
                    })

                    if(res.data.success){
                        toast.success(res.data.message);
                        dispatch(sendLoginDetails(res.data.loggedInPerson))
                        navigate('/');
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
                <div className='login-Form'>
                         <Formik
                              validationSchema={schema}
                              onSubmit={SubmitForm}
                              initialValues={{
                                email: '',
                                password: '',
                              }}
                            >
                              {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                  <Row>
                                    <Col lg={12}>
                                        <div className='login-div'>
                                            <h2>Login</h2>
                                        </div>
                                    </Col>
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
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder='password....'
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={errors.password}
                        
                                      />
                        
                                      <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                      <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
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

export default Login