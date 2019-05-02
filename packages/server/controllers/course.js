const Course = require('../models/course.model');

module.exports.createCourse = async (req, res, next) => {
  try {
    const { courseName, problems, needDB, comments, description } = req.body;
    const course = await Course.findOne({courseName});
    if (course) {
      res.status(409).json({
        message: `Course with title ${courseName} already exists.`
      });
      return;
    }
    const newCourse = await new Course({
      courseName,
      problems,
      needDB,
      comments,
      description,
      userCreated: req.user._id,
      status: 'pending',
    }).save();
    res.status(201).json({
      message: `Course with title ${newCourse.courseName} created successfully!`
    });
    next();
  }  catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({userCreated: req.user._id}).skip(+req.query.offset).limit(5);
    const count = await Course.count();
    res.status(200).json({courses, length: count});
    next();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params._id);
    if (course) {
      res.status(200).json(course);
      next();
    } else {
      res.status(404).json({ message: 'Course not found' })
    }
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.updateCourse = async (req, res, next) => {
  try {
    const { courseName, comments, needDB, problems, status, feedback, description } = req.body;
    const course = await Course.findOneAndUpdate(
      { _id: req.params._id },
      { courseName, comments, needDB, problems, status, feedback, description },
      { new: true });
    res.status(200).json(course);
    next();
  } catch (e) {
    res.status(500).json(e)
  }
};

module.exports.deleteCourse = async (req, res, next) => {
  try {

  } catch (e) {
    res.status(500).json(e)
  }
};
