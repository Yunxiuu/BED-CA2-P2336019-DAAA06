const model = require('../models/taskModel.js');

// ##############################################################
// CREATE NEW Task
// ##############################################################
module.exports.createNewTask = (req, res, next) => {
    const data = {
        task_name: req.body.task_name,
        description: req.body.description,
    }

    if (data.task_name == undefined || data.description == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(201).json({
                task_id: results.insertId,
                task_name: data.task_name,
                description: data.description,
            });
        }
    }

    model.createTask(data, callback);
}

// ##############################################################
// READ ALL Task
// ##############################################################
module.exports.readAllTask = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTask:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.readTask(null, callback);
}

// ##############################################################
// READ ALL Task BY ID
// ##############################################################
module.exports.readTaskById = (req, res, next) => {
    const data = {
        Task_id: req.params.Task_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
};

// ##############################################################
// UPDATE Task BY ID
// ##############################################################
module.exports.updateTaskById = (req, res, next) => {
    const data = {
        task_name: req.body.task_name,
        description: req.body.description,
        task_id: req.params.task_id,
    }

    if (data.task_name == undefined || data.description == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Task not found." });
            }
            else res.status(200).json({
                task_id: data.task_id,
                task_name: data.task_name,
                description: data.description,
            });
        };
    }

    model.updateById(data, callback);
}

// ##############################################################
// DELETE Task BY ID
// ##############################################################
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Task not found." });
            } else {
                res.status(204).json({ message: 'Taskdeleted successfully.' });
            }
        }
    };

    model.deleteById(data, callback);
}