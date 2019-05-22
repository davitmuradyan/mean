const Solution = require('../models/solution.model');
const {
  SolutionAlreadyExistsError,
  SolutionNotFoundError,
} = require('../errors/SolutionErrors');
const { STATUSES: { STATUS_PENDING, STATUS_APPROVED } } = require('../constants');

module.exports.createSolution = async (req, res, next) => {
  try {
    const {
      courseName, problem,
      comments, functionName,
      numberOfInputs, parameters,
      testCaseInput, testCaseOutput,
      solution
    } = req.body;
    const solutionModel = await Solution.findOne({functionName});

    if (solutionModel) {
      return next(new SolutionAlreadyExistsError(problem));
    }
    const newSolution = await new Solution({
      course: courseName,
      name: problem,
      functionName,
      comments,
      numberOfInputs,
      parameters: parameters.split(','),
      testCaseInput: testCaseInput.split('|'),
      testCaseOutput,
      solution,
      userSubmitted: req.user._id,
      status: STATUS_PENDING,
    }).save();

    res.status(201).json({
      message: `Solution with title ${newSolution.functionName} created successfully!`
    });

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find().skip(Number(req.query.offset)).
    limit(5);
    const count = await Solution.count();

    res.status(200).json({solutions,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getUserSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find({userSubmitted: req.user._id}).skip(Number(req.query.offset)).
    limit(5);
    const count = await Solution.count();

    res.status(200).json({solutions,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getSingle = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return next(new SolutionNotFoundError(req.params.id));
    }
    res.status(200).json(solution);

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.updateSolution = async (req, res, next) => {
  try {
    const {
      course,
      problem,
      name,
      solution,
      parameters,
      numberOfInputs,
      testCaseInput,
      testCaseOutput,
      functionName,
      comments,
      status,
      feedback,
    } = req.body;
    const solutionNew = await Solution.findOneAndUpdate(
      { _id: req.params.id },
      {
        course,
        name: problem || name,
        solution,
        parameters,
        numberOfInputs,
        testCaseInput,
        testCaseOutput,
        functionName,
        comments,
        status,
        feedback,
      },
      { new: true }
    );

    res.status(200).json(solutionNew);

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getSolutionsByCourse = async (req, res, next) => {
  try {
    const solutions = await Solution.find({ course: req.params.id });
    const filtered = solutions.filter((item) => item.status === STATUS_APPROVED);

    res.status(200).json({solutions: filtered});

    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getReviewSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find({ status: STATUS_PENDING }).limit(5);
    const count = await Solution.count({ status: STATUS_PENDING });

    res.status(200).json({solutions,
      length: count});

    return next(null);
  } catch (error) {
    return next(error);
  }
};
