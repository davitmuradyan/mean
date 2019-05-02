const Solution = require('../models/solution.model');

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
      res.status(409).json({
        message: `This solution already exists.`
      });
      return;
    }
    const newSolution = await new Solution({
      course: courseName,
      name: problem,
      functionName, comments,
      numberOfInputs,
      parameters: parameters.split(','),
      testCaseInput, testCaseOutput,
      solution, userSubmitted: req.user._id,
      status: 'pending',
    }).save();
    res.status(201).json({
      message: `Solution with title ${newSolution.functionName} created successfully!`
    });
    next();
  }  catch (error) {
    throw error;
  }
};

module.exports.getSolutions = async (req, res, next) => {
  try {
    const solutions = await Solution.find({userSubmitted: req.user._id}).skip(+req.query.offset).limit(5);
    const count = await Solution.count();
    res.status(200).json({solutions, length: count});
    next();
  } catch (e) {
    throw e;
  }
};

module.exports.getSingle = async (req, res, next) => {
  try {
    const solution = await Solution.findById(req.params.id);
    solution ? res.status(200).json(solution) : res.status(404).json({ message: 'Solution not found' });
    next();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.updateSolution = async (req, res, next) => {
  try {
    const {
      course,
      problem,
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
    next();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports.getSolutionsByCourse = async (req, res, next) => {
  try {
    const solutions = await Solution.find({ course: req.params.id });
    res.status(200).json({solutions});
    next();
  } catch (e) {
    res.status(500).json(e);
  }
};
