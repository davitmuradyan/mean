const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/mailer');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
const {
  UserNotFoundError,
  IncorrectCredentialsError,
  AccountIsNotVerifiedError,
  UserAlreadyExistsError,
} = require('../errors/UserErrors');

module.exports.login = async (req, res, next) => {
  try {
    const candidate = await User.findOne({username: req.body.username});

    if (!candidate) {
      return next(new UserNotFoundError(req.body.username));
    }
    if (!bcryptjs.compareSync(req.body.password, candidate.password)) {
      return next(new IncorrectCredentialsError());
    }
    if (candidate.verified === false) {
      return next(new AccountIsNotVerifiedError());
    }
    const accessToken = jwt.sign({
      username: candidate.username,
      _id: candidate._id,
      type: candidate.type,
    }, JWT_SECRET_KEY, { expiresIn: "24 hours"});

    res.status(200).json({
      accessToken,
      userEmail: candidate.email,
      username: candidate.username,
      firstname: candidate.firstname,
      lastname: candidate.lastname,
      id: candidate._id,
      imgSrc: candidate.imgSrc,
      type: candidate.type,
    });
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const candidate = await User.findOne({$or: [
        {username: req.body.username},
        {email: req.body.email}
      ]});

    if (candidate) {
      return next(new UserAlreadyExistsError(req.body.username));
    }
    const user = await new User({
      authToken: mailer.verifyURL,
      username: req.body.username,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 4),
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }).save();

    await mailer.sendMail(req.body.email);
    res.status(201).json(user);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      {authToken: req.params.authToken},
      req.body,
    );
    const accessToken = jwt.sign({
      username: user.username
    }, JWT_SECRET_KEY, { expiresIn: "6 hours"});
    const newUser = {
      accessToken,
      userEmail: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._id
    };

    res.status(200).json(newUser);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.checkEmail = async (req, res, next) => {
  try {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
      return next(new UserAlreadyExistsError(req.body.email));
    }
    res.status(200).json({
      message: 'Free email'
    });
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.checkUsername = async (req, res, next) => {
  try {
    const candidate = await User.findOne({username: req.body.username});

    if (candidate) {
      return next(new UserAlreadyExistsError(req.body.username));
    }
    res.status(200).json({
      message: 'Free username'
    });
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.editprofile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const updatedUser = await User.findOneAndUpdate({_id: req.user._id}, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      type: user.type,
      imgSrc: req.file
        ? req.file.path
        : user.imgSrc
    }, { new: true });

    res.status(200).json(updatedUser);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.contact = async (req, res, next) => {
  try {
    const data = {
      from: req.body.contactFormEmail,
      to: '82051215@mail.ru',
      subject: req.body.contactFormSubjects,
      html: `<div>email from: ${req.body.contactFormName}, email: ${req.body.contactFormEmail}
    <hr>message: ${req.body.contactFormMessage}</div>`,
    };

    await mailer.sendMail('', data);
    res.status(200).json({message: 'message sent successfully.'});
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
    return next(null);
  } catch (error) {
    return next(error);
  }
};

module.exports.updatePermission = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body._id },
      { type: req.body.type },
      { new: true }
    );

    res.status(200).json(user);
    return next(null);
  } catch (error) {
    return next(error);
  }
};
