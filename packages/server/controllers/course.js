const Course = require('../models/course.model');
const {
  CourseNotFoundError,
  CourseAlreadyExistsError,
} = require('../errors/CourseErrors');
const { STATUSES: { STATUS_PENDING } } = require('../constants');

module.exports.createCourse = async (req, res, next) => {
  try {
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
      status: STATUS_PENDING,
    }).save();

    res.status(201).json({
      message: `Course with title ${newCourse.courseName} created successfully!`
    });

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getUserCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({userCreated: req.user._id}).skip(Number(req.query.offset)).
      limit(5);
    const count = await Course.count({ userCreated: req.user._id });

    res.status(200).json({courses,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().skip(Number(req.query.offset)).
      limit(5);

    if (!courses) {
      return next(new CourseNotFoundError());
    }
    const count = await Course.countDocuments();

    res.status(200).json({courses,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getReviewCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ status: STATUS_PENDING }).limit(5);

    if (!courses) {
      return next(new CourseNotFoundError());
    }
    const count = await Course.countDocuments({ status: STATUS_PENDING });

    res.status(200).json({courses,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({_id: req.params.id});

    if (!course) {
      return next(new CourseNotFoundError(req.params.id));
    }
    res.status(200).json(course);

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.updateCourse = async (req, res, next) => {
  try {
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

    return next(null);
  } catch (error) {
    return next(error);
  }
};

/*
 * Module.exports.deleteCourse = async (req, res, next) => {
 *
 * };
 */
