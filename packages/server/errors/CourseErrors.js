class CourseNotFoundError extends Error {
  constructor (id) {
    super(`Course with id ${id} not found.`);
  }
}

class CourseAlreadyExistsError extends Error {
  constructor (name) {
    super(`Course ${name} already exists.`);
  }
}

module.exports = {
  CourseNotFoundError,
  CourseAlreadyExistsError,
};
