const model = require('../models/courseModel.js');

// ##############################################################
// CREATE NEW Course
// ##############################################################
module.exports.createNewCourse = (req, res, next) => {
    const data = {
        course_name: req.body.course_name,
        professor: req.body.professor,
        description: req.body.description,
    }

    if (data.course_name == undefined || data.professor == undefined || data.description == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewCourse:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(201).json({
                course_id: results.insertId,
                course_name: data.course_name,
                professor: data.professor,
                description: data.description,
            });
        }
    }

    model.createCourse(data, callback);
}

// ##############################################################
// READ ALL Course
// ##############################################################
module.exports.readAllCourse = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCourse:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.readCourse(null, callback);
}

// ##############################################################
// READ ALL Course BY ID
// ##############################################################
module.exports.readCourseById = (req, res, next) => {
    const data = {
        Course_id: req.params.Course_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCourseById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Course not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
};

// ##############################################################
// UPDATE Course BY ID
// ##############################################################
module.exports.updateCourseById = (req, res, next) => {
    const data = {
        course_name: req.body.course_name,
        professor: req.body.professor,
        description: req.body.description,
        course_id: req.params.course_id,
    }

    if (data.course_name == undefined || data.professor == undefined || data.description == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateCourseById:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Course not found." });
            }
            else res.status(200).json({
                course_id: data.course_id,
                course_name: data.course_name,
                professor: data.professor,
                description: data.description,
            });
        };
    }

    model.updateById(data, callback);
}

// ##############################################################
// DELETE Course BY ID
// ##############################################################
module.exports.deleteCourseById = (req, res, next) => {
    const data = {
        course_id: req.params.course_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCourseById:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Course not found." });
            } else {
                res.status(204).json({ message: 'Course deleted successfully.' });
            }
        }
    };

    model.deleteById(data, callback);
}