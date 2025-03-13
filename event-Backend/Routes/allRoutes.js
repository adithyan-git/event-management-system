const express = require('express');
const { registration, personlogin, viewProfile, updateProfile, updateProfileImage, addEvent, ViewAllEvent, updateEvent, deleteEvent, logOut, getLoginDetails } = require('../Controller/userController');
const uploads = require('../Middlewares/multer');
const { authentication, authorisation } = require('../Middlewares/authentication');
const { viewAllUser, viewAllEvents, updateUserDetails, updateUserProfileImage, deleteUser, viewUsersAllEvents } = require('../Controller/adminController');
const router = express.Router()


router.route('/registration').post(uploads.single('profileImage'),registration);
router.route('/personlogin').post(personlogin);
router.route('/viewprofile').get(authentication,viewProfile);
router.route('/updateprofile').put(authentication,updateProfile).put(authentication,updateProfileImage);
router.route('/updateprofileimage').put(authentication,uploads.single('profileImage'),updateProfileImage);
router.route('/addevent').post(authentication,authorisation('user'),addEvent);
router.route('/viewallevents').get(authentication,authorisation('user'),ViewAllEvent);
router.route('/updateevent/:id').put(authentication,authorisation('user'),updateEvent);
router.route('/deleteevent/:id').delete(authentication,deleteEvent);
router.route('/logout').delete(authentication,logOut);
router.route('/viewallusers').get(authentication,authorisation('admin'),viewAllUser);
router.route('/viewalluserevents').get(authentication,authorisation('admin'),viewUsersAllEvents);
router.route('/updateuserdetails/:id').put(authentication,authorisation('admin'),updateUserDetails);
router.route('/updateuserprofileimage/:id').put(authentication,authorisation('admin'),uploads.single('profileImage'),updateUserProfileImage);
router.route('/deleteuser/:id').delete(authentication,authorisation('admin'),deleteUser);
router.route('/getlogindetails').get(authentication,getLoginDetails);
















module.exports = router

