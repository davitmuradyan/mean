const UserErrors = require('./UserErrors');
const CourseErrors = require('./CourseErrors');
const SolutionErrors = require('./SolutionErrors');
const DatasetErrors = require('./DatasetErrors');

const {
  UnAuthorizedError,
  ForbiddenError,
  IncorrectCredentialsError,
  UserAlreadyExistsError,
  UserIsBlockedError,
  UserNotFoundError,
} = UserErrors;

const {
  CourseNotFoundError,
  CourseAlreadyExistsError,
} = CourseErrors;

const {
  SolutionNotFoundError,
  SolutionAlreadyExistsError,
} = SolutionErrors;

const {
  DatasetNotFoundError,
  DatasetAlreadyExistsError,
  DatasetValidationError,
} = DatasetErrors;

const errorHandler = (err, req, res, next) => {
  switch (err.constructor) {
  case UnAuthorizedError:
    res.status(401).json({ message: err.message });
    break;
  case ForbiddenError:
    res.status(403).json({ message: err.message });
    break;
  case IncorrectCredentialsError:
    res.status(400).json({ message: err.message });
    break;
  case UserAlreadyExistsError:
    res.status(409).json({ message: err.message });
    break;
  case UserNotFoundError:
    res.status(404).json({ message: err.message });
    break;
  case UserIsBlockedError:
    res.status(400).json({ message: err.message });
    break;
  case CourseNotFoundError:
    res.status(404).json({ message: err.message });
    break;
  case CourseAlreadyExistsError:
    res.status(409).json({ message: err.message });
    break;
  case SolutionNotFoundError:
    res.status(404).json({ message: err.message });
    break;
  case SolutionAlreadyExistsError:
    res.status(409).json({ message: err.message });
    break;
  case DatasetNotFoundError:
    res.status(404).json({ message: err.message });
    break;
  case DatasetAlreadyExistsError:
    res.status(409).json({ message: err.message });
    break;
  case DatasetValidationError:
    res.status(409).json({ message: err.message });
    break;
  default:
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  errorHandler,
  UserErrors,
  CourseErrors,
  SolutionErrors,
  DatasetErrors,
};
