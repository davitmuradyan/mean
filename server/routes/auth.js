const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/checkemail', authController.checkEmail)
router.post('/checkusername', authController.checkUsername)
router.put('/verify-email/:authToken', (authController.verifyEmail))

module.exports = router
