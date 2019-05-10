const express = require('express');
const router = express.Router();
const passport = require('passport');
const solutionController = require('../controllers/solution');
const validObjectId = require('../middlewares/validObjectId');

router.post('/', passport.authenticate('jwt', { session: false }), solutionController.createSolution);
router.get('/', passport.authenticate('jwt', { session: false }), solutionController.getSolutions);
router.get('/user', passport.authenticate('jwt', { session: false }), solutionController.getUserSolutions);
router.get('/:id', passport.authenticate('jwt', { session: false }), solutionController.getSingle);
router.put('/:id', passport.authenticate('jwt', { session: false }), solutionController.updateSolution);
router.put('/:id', passport.authenticate('jwt', { session: false }), solutionController.updateSolution);
router.get(
  '/course/:id',
  passport.authenticate('jwt', { session: false }),
  validObjectId,
  solutionController.getSolutionsByCourse
);

module.exports = router;
