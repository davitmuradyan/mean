const Course = require('../models/course.model');

module.exports.createCourse = async (req, res, next) => {
  try {
      const course = await Course.findOne({title: req.body.title});
      if (course) {
          res.status(409).json({
              message: `Course with title ${req.body.title} already exists.`
          });
          return;
      }
      const newCourse = await new Course({title: req.body.title }).save();
      res.status(201).json({
          message: `Course with title ${newCourse.title} created successfully!`
      });
      next();
  }  catch (error) {
      throw error;
  }
};
