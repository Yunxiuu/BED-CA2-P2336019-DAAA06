const express = require("express");
const userController = require("../controllers/userController");
const playerController = require("../controllers/playerController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.get("/token/player", jwtMiddleware.verifyToken, userController.getAllPlayersByUser);

router.post("/:userId/player", playerController.createNewPlayer, userController.createPlayerUserRel);
router.get("/:userId/player/:playerId", userController.getPlayerByUser);
router.get("/:userId/player", userController.getAllPlayersByUser);
router.put("/:userId/player/:playerId", userController.updatePlayerByUser, playerController.updatePlayerById);
router.delete("/:userId/player/:playerId", userController.deletePlayerByUser, playerController.deletePlayerById, userController.deletePlayerUserRel);

router.post("", userController.createUser);
router.get("/:userId", userController.getUser);
router.get("/", userController.getAllUser);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

router.get("/:userId/player", userController.getAllPlayersByUser);

module.exports = router;