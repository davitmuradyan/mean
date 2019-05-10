const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const passport = require('passport');
const courseController = require('../controllers/course');
const validObjectId = require('../middlewares/validObjectId');

router.post('/', passport.authenticate('jwt', { session: false }), courseController.createCourse);
router.get('/', passport.authenticate('jwt', { session: false }), courseController.getAllCourses);
router.get('/user', passport.authenticate('jwt', { session: false }), courseController.getUserCourses);
router.get('/:id', passport.authenticate('jwt', { session: false }), validObjectId, courseController.getSingleCourse);
router.put('/:id', passport.authenticate('jwt', { session: false }), courseController.updateCourse);
// router.delete('/:_id', passport.authenticate('jwt', { session: false }), courseController.deleteCourse);

module.exports = router;
