const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const upload = require('../middlewares/upload');
const passport = require('passport');
const checkSuperAdmin = require('../middlewares/checkIfAdmin');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/checkemail', authController.checkEmail);
router.post('/checkusername', authController.checkUsername);
router.put('/verify-email/:authToken', authController.verifyEmail);
router.put(
  '/edit-profile',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  authController.editprofile
);
router.post('/contact', authController.contact);
router.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  checkSuperAdmin,
  authController.getUsers
);
router.put(
  '/update-permission',
  passport.authenticate('jwt', { session: false }),
  checkSuperAdmin,
  authController.updatePermission
);

module.exports = router;
