const express = require('express');
const router = express.Router();
const passport = require('passport');
const courseController = require('../controllers/course');
const checkIfAdmin = require('../middlewares/checkIfAdmin');

router.post('/', passport.authenticate('jwt', { session:false }), courseController.createCourse);
router.get('/', passport.authenticate('jwt', { session:false }), courseController.getAllCourses);
router.get('/user', passport.authenticate('jwt', { session:false }), courseController.getUserCourses);
router.get('/:_id', passport.authenticate('jwt', { session:false }), courseController.getSingleCourse);
router.put('/:_id', passport.authenticate('jwt', { session:false }), courseController.updateCourse);
router.delete('/:_id', passport.authenticate('jwt', { session:false }), courseController.deleteCourse);

module.exports = router;
