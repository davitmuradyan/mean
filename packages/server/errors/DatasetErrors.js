class DatasetNotFoundError extends Error {
  constructor (id) {
    super(`Dataset with id ${id} not found.`);
  }
}

class DatasetAlreadyExistsError extends Error {
  constructor (name) {
    super(`Dataset ${name} already exists.`);
  }
}

class DatasetValidationError extends Error {
  constructor (message) {
    super(`Validation error: ${message}`);
  }

}

module.exports = {
  DatasetNotFoundError,
  DatasetAlreadyExistsError,
  DatasetValidationError,
};
