const express = require('express');
const router = express.Router();

const controller = require('../controllers/courseController');

router.post('/', controller.createNewCourse);
router.get('/', controller.readAllCourse);
router.get('/:course_id', controller.readCourseById);
router.put('/:course_id', controller.updateCourseById);
router.delete('/:course_id', controller.deleteCourseById);

module.exports = router;