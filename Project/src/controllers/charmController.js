const model = require('../models/charmModel.js');

// ##############################################################
// CREATE NEW Charm
// ##############################################################
module.exports.createNewCharm = (req, res, next) => {
    const data = {
        charm_name: req.body.charm_name,
        spell: req.body.spell,
        effect: req.body.effect,
    }

    if (data.charm_name == undefined || data.spell == undefined || data.effect == undefined) {
        res.status(400).json({ message: "Missing required data." });
        return;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewCharm:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(201).json({
                charm_id: results.insertId,
                charm_name: data.charm_name,
                spell: data.spell,
                effect: data.effect,
            });
        }
    }

    model.createCharm(data, callback);
}

// ##############################################################
// READ ALL Charm
// ##############################################################
module.exports.readAllCharm = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllCharm:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.readCharm(null, callback);
}

// ##############################################################
// READ ALL Charm BY ID
// ##############################################################
module.exports.readCharmById = (req, res, next) => {
    const data = {
        charm_id: req.params.charm_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readCharmById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Charm not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
};

// ##############################################################
// DELETE Charm BY ID
// ##############################################################
module.exports.deleteCharmById = (req, res, next) => {
    const data = {
        charm_id: req.params.charm_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteCharmById:", error);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ message: "Charm Charm not found." });
            } else {
                res.status(204).json({ message: 'Charm Charm deleted successfully.' });
            }
        }
    };

    model.deleteById(data, callback);
}