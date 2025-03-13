import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Registration = () => {

    const { Formik } = formik;
    const navigate = useNavigate();

    const schema = yup.object().shape({
        fullname: yup.string().required('enter the fullname'),
        email: yup.string().required('enter the email'),
        password: yup.string().required('enter the password'),
        place: yup.string().required('enter the place'),
        profileImage: yup.mixed().required('upload a image'),
      });

      const handleFileChange = (event,setFieldValue)=>{        
         const image = event.target.files[0]
         setFieldValue('profileImage',image)
      }

      const SubmitForm = async (data) => {
        
        const formData = new FormData()

        formData.append('fullname',data.fullname)
        formData.append('email',data.email)
        formData.append('password',data.password)
        formData.append('place',data.place)
        formData.append('profileImage',data.profileImage)



        try {
            const res = await axios.post('http://localhost:2000/registration',formData
            ,{
                withCredentials:true
            }) 
    
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        
      }
      
  return (
    <Container fluid>
        <Row>
            <Col lg={12}>
                <div className='registration-div'>
                <Formik
      validationSchema={schema}
      onSubmit={SubmitForm}
      initialValues={{
        fullname: '',
        email: '',
        password: '',
        place: '',
        profileImage:null

      }}
    >
      {({setFieldValue, handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col lg={12}>
            <div className='register-div'>
                <h2>Registration</h2>
            </div>
          </Col>
        </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Full Name</Form.Label>
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

         <Form.Group as={Col} md="4" controlId="validationFormik02">
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
    
          <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password..."
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>Looks Good</Form.Control.Feedback>

            </Form.Group>
          </Row>
          <Row className="mb-3">
          
            <Form.Group as={Col} md="12" controlId="validationFormik04">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="place..."
                name="place"
                value={values.place}
                onChange={handleChange}
                isValid={touched.place && !errors.place}
                isInvalid={!!errors.place}
              />
              <Form.Control.Feedback type="invalid">
                {errors.place}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>Looks Good</Form.Control.Feedback>

            </Form.Group>
           
          </Row>
          <Row className="mb-3">
          
          <Form.Group as={Col} md="12" controlId="validationFormik05">
            <Form.Label>ProfileImage</Form.Label>
            <Form.Control
              type="file"
              name="profileImage"
              onChange={(e)=>handleFileChange(e,setFieldValue)}
              isValid={touched.profileImage && !errors.profileImage}
              isInvalid={!!errors.profileImage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.profileImage}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>Looks Good</Form.Control.Feedback>

          </Form.Group>
         
        </Row>
          <Link to='/login'><p className='sign-in-link'>Sign-In...?</p></Link>
          <div className='registration-btn'>
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

export default Registration