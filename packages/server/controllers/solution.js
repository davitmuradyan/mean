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
        const solutions = await Solution.find({userSubmitted: req.user._id});
        if (solutions.length > 0) {
            res.status(200).json(solutions);
            next();
        } else {
            res.status(404).json({message: 'You have not created any course.'});
            next()
        }
    } catch (e) {
        throw e;
    }
};

module.exports.getSingle = async (req, res, next) => {
  try {
      const solution = await Solution.findById(req.params.id);
      console.log(solution);
      solution ? res.status(200).json(solution) : res.status(404).json({ message: 'Solution not found' });
      next();
  } catch (e) {
      res.status(500).json(e);
  }
};
