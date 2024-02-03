const express = require('express');

const userRoutes = require('./userRoutes');
const playerRoutes = require('./playerRoutes');
const courseRoutes = require('./courseRoutes');
const charmRoutes = require('./charmRoutes');
const taskRoutes = require('./taskRoutes');
const messageRoutes = require('./messageRoutes');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.use("/user", userRoutes);
router.use("/player", playerRoutes);
router.use("/course", courseRoutes);
router.use("/charm", charmRoutes);
router.use("/task", taskRoutes);
router.use("/message", messageRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;