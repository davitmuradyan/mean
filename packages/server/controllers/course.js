const Course = require('../models/course.model');

module.exports.createCourse = async (req, res, next) => {
  try {
      const { courseName, problems, needDB, comments } = req.body;
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
          userCreated: req.user._id,
          status: 'Pending',
      }).save();
      res.status(201).json({
          message: `Course with title ${newCourse.courseName} created successfully!`
      });
      next();
  }  catch (error) {
      throw error;
  }
};

module.exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({userCreated: req.user._id});
    if (courses.length > 0) {
        res.status(200).json(courses);
        next();
    } else {
        res.status(404).json({message: 'You have not created any course.'});
        next()
    }
  } catch (e) {
    throw e;
  }
};
