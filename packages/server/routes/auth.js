const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const upload = require('../middlewares/upload');
const passport = require('passport');

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

module.exports = router;
