const { CourseNotFoundError } = require('../errors/CourseErrors');

module.exports = (req, res, next) => {
  if (req.query.courseId) {
    if (!req.query.courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new CourseNotFoundError(req.query.courseId));
    }
  }

  if (req.params.id) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new CourseNotFoundError(req.params.id));
    }
  }

  return next();
};
