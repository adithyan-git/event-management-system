import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sendProfileUpdatedImage } from '../Redux/slice';

const EditProfileImage = () => {

    const { Formik } = formik;
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const profileDetails = useSelector((state)=>state.events.ProfileDetails)
    
                      const schema = yup.object().shape({
                             profileImage: yup.mixed().required('enter the fullname'),
                          });


                          const SubmitForm = async (data)=>{

                            const formData = new FormData()

                            formData.append('profileImage',data.profileImage);
                          
                                          try {
                                              const res = await axios.put('http://localhost:2000/updateProfileImage',formData,{
                                                  withCredentials:true
                                              })
                          
                                              if(res.data.success){
                                                  toast.success(res.data.message);
                                                  dispatch(sendProfileUpdatedImage(res.data.findedPerson))
                                                  navigate('/')
                                              }else{
                                                  toast.error(res.data.message);
                                              }
                                          } catch (error) {
                                              toast.error(error.message);
                                          }
                                        }

                                        const handleFileChange = (e,setFieldValue) => {

                                            const image = e.target.files[0]
                                            setFieldValue('profileImage',image)
                                        }
  return (
    <Container>
        <Row>
            <Col lg={12}>
                <div className='profile-imgedit-div'>
                      <Formik
                                                                      validationSchema={schema}
                                                                      onSubmit={SubmitForm}
                                                                      initialValues={{
                                                                        profileImage:profileDetails.profileImage,
                                                                       
                                                                      }}
                                                                    >
                                                                      {({setFieldValue, handleSubmit, handleChange, values, touched, errors }) => (
                                                                        <Form noValidate onSubmit={handleSubmit}>
                                                                          <div className='img-head'>
                                                                            <h2>EditImage</h2>
                                                                          </div>
                                                                             <Row className="mb-3">
                                                                            <Form.Group as={Col} md="12" controlId="validationFormik01">
                                                                              <Form.Label>ProfileImage</Form.Label>
                                                                              <Form.Control
                                                                                type="file"
                                                                                name="profileImage"
                                                                                placeholder='fullname....'
                                                                                onChange={(e)=>handleFileChange(e,setFieldValue)}
                                                                                isValid={touched.profileImage && !errors.profileImage}
                                                                                isInvalid={errors.profileImage}
                                                                              />
                                                                              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                                                                              <Form.Control.Feedback type='invalid'>{errors.profileImage}</Form.Control.Feedback>
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

export default EditProfileImage