const Course = require('../models/course.model');
const {
  CourseNotFoundError,
  CourseAlreadyExistsError,
} = require('../errors/CourseErrors');

module.exports.createCourse = async (req, res, next) => {
  const { courseName, problems, needDB, comments, description } = req.body;
  const course = await Course.findOne({courseName});

  if (course) {
    return next(new CourseAlreadyExistsError(courseName));
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
};

module.exports.getUserCourses = async (req, res, next) => {
  const courses = await Course.find({userCreated: req.user._id}).skip(Number(req.query.offset)).
    limit(5);
  const count = await Course.count();

  res.status(200).json({courses,
    length: count});
  next();

};

module.exports.getAllCourses = async (req, res, next) => {
  const courses = await Course.find().skip(Number(req.query.offset)).
    limit(5);

  if (!courses) {
    return next(new CourseNotFoundError());
  }
  const count = await Course.countDocuments();

  res.status(200).json({courses,
    length: count});
};

module.exports.getSingleCourse = async (req, res, next) => {
  const course = await Course.findOne({_id: req.params.id});

  if (!course) {
    return next(new CourseNotFoundError(req.params.id));
  }
  res.status(200).json(course);
};

module.exports.updateCourse = async (req, res, next) => {
  const { courseName, comments, needDB, problems, status, feedback, description } = req.body;
  const course = await Course.findOneAndUpdate(
    { _id: req.params.id },
    { courseName,
      comments,
      needDB,
      problems,
      status,
      feedback,
      description },
    { new: true }
  );

  res.status(200).json(course);
  next();
};

/*
 * Module.exports.deleteCourse = async (req, res, next) => {
 *
 * };
 */
