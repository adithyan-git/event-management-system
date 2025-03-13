import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { sendEditedUserDetails } from '../Redux/slice';

const EditUserRoleAndStatus = () => {

     const { Formik } = formik;
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const editingValue = useSelector((state)=>state.events.editingUserValue);

            const schema = yup.object().shape({
                    role: yup.string().required('enter the role'),
                    status: yup.string().required('enter the status'),
                  });

                   const SubmitForm = async (data)=>{
                  
                                  try {
                                      const res = await axios.put(`http://localhost:2000/updateuserdetails/${editingValue._id}`,{
                                          role:data.role,
                                          status:data.status
                                      },{
                                          withCredentials:true
                                      })
                                      
                                      const details = {
                                            id:editingValue._id,
                                            role:data.role,
                                            status:data.status
                                      }
                                      if(res.data.success){
                                          toast.success(res.data.message);
                                          dispatch(sendEditedUserDetails(details))
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
                <div className='update-div'>
                      <Formik
                                                  validationSchema={schema}
                                                  onSubmit={SubmitForm}
                                                  initialValues={{
                                                    role: editingValue.role,
                                                    status: editingValue.status,
                                                  }}
                                                >
                                                  {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                    <Form noValidate onSubmit={handleSubmit}>
                                                      <Row className="mb-3">
                                                        <Form.Group as={Col} md="12" controlId="validationFormik01">
                                                          <Form.Label>Role</Form.Label>
                                                          <Form.Control
                                                            type="text"
                                                            name="role"
                                                            placeholder='role....'
                                                            value={values.role}
                                                            onChange={handleChange}
                                                            isValid={touched.role && !errors.role}
                                                            isInvalid={errors.role}
                                                          />
                                                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                          <Form.Control.Feedback type='invalid'>{errors.role}</Form.Control.Feedback>
                                                        </Form.Group>
                    
                                                      </Row>
                                                      <Row className='mb-3'>
                                                      <Form.Group as={Col} md="12" controlId="validationFormik02">
                                                          <Form.Label>status</Form.Label>
                                                          <Form.Control
                                                            type="text"
                                                            name="status"
                                                            placeholder='status....'
                                                            value={values.status}
                                                            onChange={handleChange}
                                                            isValid={touched.status && !errors.status}
                                                            isInvalid={errors.status}
                                                          />
                                                          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                          <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                                                        </Form.Group>
                                                      </Row>
                                                     
                                                      <div className='login-btn'>
                                                         <Link to={'/viewalluser'}><Button>Cancel</Button></Link><Button type="submit">Confirm</Button>
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

export default EditUserRoleAndStatus