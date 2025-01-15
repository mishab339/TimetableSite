const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/siteController');

router.get('/', siteControllers.login);
router.get('/role', siteControllers.role);
router.get('/signup', siteControllers.signup);
router.get('/login', siteControllers.login);
router.get('/studentHome', siteControllers.studentHome);
router.get('/facultyHome', siteControllers.facultyHome);
router.get('/hodHome', siteControllers.hodHome);
router.get('/studentprofile', siteControllers.studentProfile);
router.get('/facultyProfile', siteControllers.facultyProfile);
router.get('/viewStudTimetable', siteControllers.viewStudTimetable);
router.get('/viewFacTimetable', siteControllers.viewFacTimetable);
router.get('/editeTimeTable', siteControllers.editeTimetable);
router.get('/classSelect', siteControllers.classSelect);
router.get('/logout', siteControllers.logout);
router.get('/timeTable', siteControllers.timetable);
router.get('/edit-timetable',siteControllers.editTimeTable)


router.post('/login', siteControllers.login_validation);
router.post('/role', siteControllers.signup);
router.post('/studentsignup', siteControllers.studentSignup_validation);
router.post('/facultysignup', siteControllers.facultySignup_validation);
router.post('/save-timetable',siteControllers.saveTimeTable);
router.post('/get-timeTable',siteControllers.getTimeTable);
//router.get('/view-time-table',siteControllers.viewTimeTable)
//router.post('/submitClassSelected',siteControllers.submitClassSelected)


  

  module.exports = router;