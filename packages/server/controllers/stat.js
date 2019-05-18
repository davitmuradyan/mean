const StatDataset = require('../models/statDataset.model');
const { DatasetValidationError, DatasetNotFoundError } = require('../errors/DatasetErrors');

module.exports.addDataset = async (req, res, next) => {
  try {
    if (!req.body.dataset.length) {
      return next(new DatasetValidationError('Dataset can\'t be empty.'));
    }
    req.body.dataset.forEach((item) => {
      if (typeof item !== "number") {
        return next(new DatasetValidationError('Dataset can contain only NUMBER.'));
      }
    });
    const dataset = await new StatDataset({
      data: req.body.dataset,
      course: req.body.courseId,
      user: req.user._id
    }).save();

    res.status(201).json({
      dataset,
      message: `Dataset ${dataset.data} added successfully. You can use this dataset later.`
    });
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getAll = async (req, res, next) => {
  try {
    const dataSet = await StatDataset.find({
      user: req.user._id,
      course: req.query.courseId,
    });

    res.status(200).json(dataSet);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getSingle = async (req, res, next) => {
  try {
    const dataSet = await StatDataset.findById(req.params.id);

    if (!dataSet) {
      return next(new DatasetNotFoundError(req.params.id));
    }
    res.status(200).json(dataSet);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    if (req.body.dataset.length === 0) {
      return next(new DatasetValidationError('Dataset can\'t be empty.'));
    }
    req.body.dataset.forEach((item) => {
      if (typeof item !== "number") {
        return next(new DatasetValidationError('Dataset can contain only NUMBER.'));
      }
    });
    req.body.dataset.map((item) => Number(item));
    const newDataset = await StatDataset.findOneAndUpdate(
      { _id: req.params.id },
      { data: req.body.dataset },
      { new: true }
    );

    res.status(200).json(newDataset);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.remove = async (req, res, next) => {
  try {
    const dataset = await StatDataset.findOneAndRemove({
      _id: req.params.id
    });

    res.status(204).json(dataset);
    return next(null);
  } catch (error) {
    return next(error);
  }
};
