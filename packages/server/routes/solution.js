const express = require('express');
const router = express.Router();
const passport = require('passport');
const solutionController = require('../controllers/solution');

router.post('/', passport.authenticate('jwt', { session:false }), solutionController.createSolution);
router.get('/', passport.authenticate('jwt', { session:false }), solutionController.getSolutions);
router.get('/:id', passport.authenticate('jwt', { session: false }), solutionController.getSingle);

module.exports = router;
