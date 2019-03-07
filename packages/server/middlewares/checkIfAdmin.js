module.exports = (req, res, next) => {
  if (req.user.type !== 'admin') {
    res.status(403).json({
      message: "Permission denied"
    });
    return;
  }
  res.status(200);
  next()
};
