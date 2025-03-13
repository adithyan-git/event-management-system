import 'bootstrap/dist/css/bootstrap.min.css';
import "./Css/header.css"
import "./Css/registrationForm.css"
import "./Css/loginForm.css"
import "./Css/profile.css"
import "./Css/profileEditform.css"
import "./Css/editProfileImage.css"
import "./Css/userAllEvents.css"
import "./Css/viewAllUser.css"
import "./Css/viewAllUser.css"
import "./Css/editUserroleandStatus.css"
import "./Css/addEvent.css"
import "./Css/updateEvent.css"
import "./Css/homelogin.css"
import "./Css/footer.css"











import { BrowserRouter as Router, Routes,Route, } from 'react-router-dom';
import Header from './COMPONENTS/Header';
import Registration from './COMPONENTS/Registration';
import Home from './PAGES/Home';
import Login from './COMPONENTS/Login';
import Profile from './COMPONENTS/Profile';
import { toast, ToastContainer } from 'react-toastify';
import EditProfileDetails from './COMPONENTS/EditProfileDetails';
import EditProfileImage from './COMPONENTS/EditProfileImage';
import ViewAllUserEvents from './COMPONENTS/ViewAllUserEvents';
import ViewAllUsers from './COMPONENTS/ViewAllUsers';
import EditUserRoleAndStatus from './COMPONENTS/EditUserRoleAndStatus';
import AddEvent from './COMPONENTS/AddEvent';
import ViewAddedEvents from './COMPONENTS/ViewAddedEvents';
import UpdateEvents from './COMPONENTS/UpdateEvents';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { sendLoginDetails } from './Redux/slice';


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
      const getLoginDetails = async()=>{
        try {
          const res = await axios.get('http://localhost:2000/getlogindetails',{
            withCredentials:true
          })
        if(res.data.success){
          toast.success(res.data.message);
          dispatch(sendLoginDetails(res.data.findPerson))
        }else{
          toast.success(res.data.message)
        }
        } catch (error) {
          toast.error(error.message)
        }
      }
      getLoginDetails()
  },[dispatch])


   
  return (

    <Router>
      <ToastContainer
position="top-right"
autoClose={3000}

/>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/viewprofile' element={<Profile/>}/>
          <Route path='/editprofile' element={<EditProfileDetails/>}/>
          <Route path='/editprofileimage' element={<EditProfileImage/>}/>
          <Route path='/viewuserallevents' element={<ViewAllUserEvents/>}/>
          <Route path='/viewalluser' element={<ViewAllUsers/>}/>
          <Route path='/edituserroleandstatus' element={<EditUserRoleAndStatus/>}/>
          <Route path='/addevents' element={<AddEvent/>}/>
          <Route path='/viewaddedevent' element={<ViewAddedEvents/>}/>
          <Route path='/updateevents' element={<UpdateEvents/>}/>



          


      </Routes>
    </Router>
  );
}

export default App;
