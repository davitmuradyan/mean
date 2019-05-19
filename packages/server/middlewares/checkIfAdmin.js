const { USER_TYPES: { USER_TYPE_SUPER_ADMIN } } = require('../constants');

module.exports = (req, res, next) => {
  if (req.user.type !== USER_TYPE_SUPER_ADMIN) {
    res.status(403).json({
      message: "Permission denied"
    });

    return;
  }
  res.status(200);
  next();
};
