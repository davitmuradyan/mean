const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const upload = require('../middlewares/upload');

router.post('/login', authController.login);
router.post('/register', upload.single('image'), authController.register);
router.post('/checkemail', authController.checkEmail);
router.post('/checkusername', authController.checkUsername);
router.put('/verify-email/:authToken', authController.verifyEmail);
// router.post('/upload', upload.single('image'), authController.upload);

module.exports = router;
