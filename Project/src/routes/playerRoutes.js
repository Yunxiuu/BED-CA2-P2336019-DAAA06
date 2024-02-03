const express = require('express');
const router = express.Router();

const controller = require('../controllers/playerController');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', controller.readAllPlayer);

router.post('/', jwtMiddleware.verifyToken, controller.createNewPlayer, userController.createPlayerUserRel);

router.get('/:playerId', controller.readPlayerById);
router.put('/:playerId', jwtMiddleware.verifyToken, userController.checkPlayerBelongsToUser, controller.updatePlayerById);
router.delete('/:playerId', jwtMiddleware.verifyToken, userController.checkPlayerBelongsToUser, controller.deletePlayerById, userController.deletePlayerUserRel);

router.get('/:playerId/pokemon/dex', controller.readAllPokemonWithDexInfoByPlayerId);

module.exports = router;