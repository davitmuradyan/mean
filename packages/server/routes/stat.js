const express = require('express');
const router = express.Router();
const statController = require('../controllers/stat');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), statController.addDataset);
router.get('/', passport.authenticate('jwt', { session: false }), statController.getAll);
router.get('/:_id', passport.authenticate('jwt', { session: false }), statController.getSingle);
router.put('/:_id', passport.authenticate('jwt', { session: false }), statController.update);
router.delete('/:_id', passport.authenticate('jwt', { session: false }), statController.remove);

module.exports = router;
