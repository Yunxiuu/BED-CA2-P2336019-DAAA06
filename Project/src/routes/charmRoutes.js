const express = require('express');
const router = express.Router();

const controller = require('../controllers/charmController');

router.post('/', controller.createNewCharm);
router.get('/', controller.readAllCharm);
router.get('/:charm_id', controller.readCharmById);
router.delete('/:charm_id', controller.deleteCharmById);

module.exports = router;