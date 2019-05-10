const express = require('express');
const router = express.Router();
const statController = require('../controllers/stat');
const passport = require('passport');
const validObjectId = require('../middlewares/validObjectId');

router.post('/', passport.authenticate('jwt', { session: false }), statController.addDataset);
router.get('/', passport.authenticate('jwt', { session: false }), validObjectId, statController.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), validObjectId, statController.getSingle);
router.put('/:id', passport.authenticate('jwt', { session: false }), validObjectId, statController.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), validObjectId, statController.remove);

module.exports = router;
