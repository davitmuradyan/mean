const StatDataset = require('../models/statDataset.model');

module.exports.addDataset = async (req, res) => {
  try {
    if (!Array.isArray(req.body.dataset))
      res.status(400).json({ message: 'Not an array.' });
    if (req.body.dataset.length === 0)
      res.status(400).json({ message: 'Dataset can\'t be empty.' });
    if (req.body.dataset && req.user) {
      req.body.dataset.map(item => {
        if (typeof item !== "number") {
          res.status(400).json({
            message: `Ops! Dataset can contain only NUMBER.`
          });
          throw Error;
        }
      });
      const dataset = await new StatDataset({
        data: req.body.dataset,
        user: req.user._id
      }).save();
      res.status(201).json({
        dataset,
        message: `Dataset ${dataset.data} added successfully. You can use this dataset later.`
      });
    }
    else {
      res.status(400).json({ message: 'Fields are required' });
    }
  } catch (e) {
    throw e;
  }
};

module.exports.getAll = async (req, res) => {
  try {
    if (req.user) {
      const dataSet = await StatDataset.find({
        user: req.user._id
      });
      res.status(200).json(dataSet);
    }
    else
      res.status(400).json({ message: 'Something went wrong!' });
  } catch (e) {
    throw e;
  }
};

module.exports.getSingle = async (req, res) => {
  try {
    if (req.user && req.params._id) {
      const dataSet = await StatDataset.findById(req.params._id);
      res.status(200).json(dataSet);
    }
    else
      res.status(400).json({ message: 'Something went wrong!' });
  } catch (e) {
    throw e;
  }
};

module.exports.update = async (req, res) => {
  try {
    if (req.user && req.params._id) {
      const oldDataset = {
        _id: req.params._id
      };
      req.body.dataset.map(item => {
        if (typeof item !== "number") {
          res.status(400).json({
            message: `Ops! Dataset can contain only NUMBER.`
          });
          throw Error;
        }
      });
      const newDataset = await StatDataset.findOneAndUpdate(oldDataset, {
        data: req.body.dataset
      }, { new: true });
      res.status(200).json(newDataset);
    }
    else {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  } catch (e) {
    throw e;
  }
};

module.exports.remove = async (req, res) => {
  try {
    if (req.user && req.params._id) {
      const dataset = await StatDataset.findOneAndRemove({
        _id: req.params._id
      });
      res.status(204).json(dataset);
    }
    else {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  } catch (e) {
    throw e;
  }
};
