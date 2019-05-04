const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../utils/mailer');
const { JWT_SECRET_KEY } = require('../constants/constants');
const {
  UserNotFoundError,
  IncorrectCredentialsError,
  AccountIsNotVerifiedError,
  UserAlreadyExistsError,
} = require('../errors/UserErrors');

module.exports.login = async (req, res, next) => {
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
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.verifyEmail = async (req, res) => {
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
};

module.exports.checkEmail = async (req, res, next) => {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    return next(new UserAlreadyExistsError(req.body.email));
  }
  res.status(200).json({
    message: 'Free email'
  });
};

module.exports.checkUsername = async (req, res, next) => {
  const candidate = await User.findOne({username: req.body.username});

  if (candidate) {
    return next(new UserAlreadyExistsError(req.body.username));
  }
  res.status(200).json({
    message: 'Free username'
  });
};

module.exports.editprofile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const updatedUser = await User.findOneAndUpdate(req.user._id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    imgSrc: req.file
      ? req.file.path
      : user.imgSrc
  }, { new: true });

  res.status(200).json(updatedUser);
};

module.exports.contact = async (req, res) => {
  const data = {
    from: req.body.contactFormEmail,
    to: '82051215@mail.ru',
    subject: req.body.contactFormSubjects,
    html: `<div>email from: ${req.body.contactFormName}, email: ${req.body.contactFormEmail}
    <hr>message: ${req.body.contactFormMessage}</div>`,
  };

  await mailer.sendMail('', data);
  res.status(200).json({message: 'message sent successfully.'});
};

module.exports.getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
};

module.exports.updatePermission = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body._id },
    { type: req.body.type },
    { new: true }
  );

  res.status(200).json(user);
};
