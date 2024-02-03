const express = require('express');
const router = express.Router();

const controller = require('../controllers/taskController');

router.post('/', controller.createNewTask);
router.get('/', controller.readAllTask);
router.get('/:task_id', controller.readTaskById);
router.put('/:task_id', controller.updateTaskById);
router.delete('/:task_id', controller.deleteTaskById);

module.exports = router;