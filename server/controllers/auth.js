const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailer = require('../utils/mailer')
const { JWT_SECRET_KEY } = require('../constants/constants')

module.exports.login = async (req, res) => {
    try {
        if (req.body.username === undefined) {
            throw 'username can\'t be blank'
        }
        const candidate = await User.findOne({username: req.body.username})
        if (!candidate) {
            res.status(404).json({
                message: `Username ${req.body.username} not found`
            })
        }
        else {
            if (!bcryptjs.compareSync(req.body.password, candidate.password)) {
                res.status(409).json({
                    message: 'Incorrect password'
                })
            }
            else if(!candidate.verified) {
                res.status(401).json({
                    message: 'Account is not verified, please verify it first'
                })
            } else {
                const accessToken = jwt.sign({
                    username: candidate.username
                }, JWT_SECRET_KEY, { expiresIn: "6 hours"})
                res.status(200).json({
                    accessToken,
                    userEmail: candidate.email,
                    username: candidate.username,
                    firstname: candidate.firstname,
                    lastname: candidate.lastname,
                    id: candidate._id
                })
            }
        }
    } catch (error) {
        res.status(500).json(error.message ? error.message : error)
    }
}

module.exports.register = async (req, res) => {
    try {
        const candidate = await User.findOne( {$or: [{username: req.body.username}, {email: req.body.email}]} )
        if (candidate) {
            res.status(409).json({
                message: `User already exists`
            })
        }
        else {
            const user = await new User({
                authToken: mailer.verifyURL,
                username: req.body.username,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 4),
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }).save()
            console.log(user)
            await mailer.sendMail(req.body.email)
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            {authToken: req.params.authToken}, 
            req.body,
        )
        const accessToken = jwt.sign({
            username: user.username
        }, JWT_SECRET_KEY, { expiresIn: "6 hours"})
        const newUser = {
            accessToken,
            userEmail: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            id: user._id
        }
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.checkEmail = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: `User with ${req.body.email} email already exists`
        })
    } 
    res.status(200).json({
        message: 'Free email'
    })
}

module.exports.checkUsername = async (req, res) => {
    const candidate = await User.findOne({username: req.body.username})
    if (candidate) {
        res.status(409).json({
            message: `User with ${req.body.username} username already exists`
        })
    } 
    res.status(200).json({
        message: 'Free username'
    })
}