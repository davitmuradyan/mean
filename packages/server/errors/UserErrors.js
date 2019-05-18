class UserNotFoundError extends Error {
  constructor (username) {
    super(`User with username ${username} not found.`);
  }
}

class UserAlreadyExistsError extends Error {
  constructor (username) {
    super(`Username ${username} is taken.`);
  }
}

class IncorrectCredentialsError extends Error {
  constructor () {
    super('Invalid credentials.');
  }
}

class UnAuthorizedError extends Error {
  constructor () {
    super('Please Authorize first.');
  }
}

class ForbiddenError extends Error {
  constructor () {
    super('You have no permission.');
  }
}

class UserIsBlockedError extends Error {
  constructor () {
    super(`Your account is blocked, please contact us if you have any questions.`);
  }
}

class AccountIsNotVerifiedError extends Error {
  constructor () {
    super('Account is not verified, please verify it first');
  }
}

module.exports = {
  UserNotFoundError,
  UserAlreadyExistsError,
  IncorrectCredentialsError,
  UnAuthorizedError,
  ForbiddenError,
  UserIsBlockedError,
  AccountIsNotVerifiedError
};
