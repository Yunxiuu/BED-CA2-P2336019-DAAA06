const model = require("../models/playerModel.js");

module.exports.readAllPlayer = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.readPlayerById = (req, res, next) => {
    const data = {
        id: req.params.playerId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.createNewPlayer = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).send("Error: name is undefined");
        return;
    }

    const data = {
        name: req.body.name,
        level: 1
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            if (res.locals.userId == undefined && req.params.userId == undefined) {
                res.status(201).json(results);
            }
            else {
                if (res.locals.userId == undefined && req.params.userId != undefined) {
                    res.locals.userId = req.params.userId;
                }
                console.log("results.insertId:", results.insertId)
                console.log("results:", results)
                res.locals.playerId = results.insertId;
                next();
            }
        }
    }

    model.insertSingle(data, callback);
}

module.exports.updatePlayerById = (req, res, next) => {
    if (req.body.name == undefined) {
        res.status(400).json({
            message: "Error: name is undefined"
        });
        return;
    }

    const data = {
        id: req.params.playerId,
        name: req.body.name
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else {
                if (req.params.userId == undefined) res.status(204).send();
                else res.status(200).send({
                    message: "Player " + req.params.id + " from User " + req.params.userId + " updated successfully."
                });
            }
        }
    }

    model.updateById(data, callback);
}

module.exports.deletePlayerById = (req, res, next) => {
    const data = {
        id: req.params.playerId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            console.log("deletePlayerById results:", results[0]);
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else {
                if (res.locals.userId == undefined) {
                    console.log("res.locals.userId is undefined");
                    res.status(204).send();
                }
                else next();
            }
        }
    }

    model.deleteById(data, callback);
}

module.exports.readAllPokemonWithDexInfoByPlayerId = (req, res, next) => {
    const data = {
        id: req.params.playerId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPokemonWithDexInfo:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAllPokemonWithDexInfoByPlayerId(data, callback);
}