class SolutionNotFoundError extends Error {
  constructor (id) {
    super(`Solution with id ${id} not found.`);
  }
}

class SolutionAlreadyExistsError extends Error {
  constructor (name) {
    super(`Solution ${name} already exists.`);
  }
}

module.exports = {
  SolutionNotFoundError,
  SolutionAlreadyExistsError,
};
