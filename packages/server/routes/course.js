const express = require('express');
const router = express.Router();
const passport = require('passport');
const courseController = require('../controllers/course');
const checkIfAdmin = require('../middlewares/checkIfAdmin');

router.post('/', passport.authenticate('jwt', { session:false }), courseController.createCourse);
router.get('/', passport.authenticate('jwt', { session:false }), courseController.getAllCourses);

module.exports = router;
