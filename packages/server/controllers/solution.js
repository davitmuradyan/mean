const Solution = require('../models/solution.model');

module.exports.createSolution = async (req, res, next) => {
    try {
        const {
            courseName,
            problem,
            comments,
            functionName,
            numberOfInputs,
            parameters,
            testCaseInput,
            testCaseOutput,
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
            functionName,
            comments,
            numberOfInputs,
            parameters,
            testCaseInput,
            testCaseOutput,
            solution,
            userSubmitted: req.user._id,
            status: 'Pending',
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

};
