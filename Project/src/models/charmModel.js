const pool = require('../services/db');

// ##############################################################
// CREATE NEW Charm
// ##############################################################
module.exports.createCharm = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Charm (charm_name, spell, effect)
    VALUES (?, ?, ?);
`   ;
    const VALUES = [data.charm_name, data.spell, data.effect];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// READ ALL Charm
// ##############################################################
module.exports.readCharm = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Charm;
`   ;

    pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// SELECT Charm BY ID
// ##############################################################
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Charm
        WHERE charm_id = ?;
    `   ;
    const VALUES = [data.charm_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// UPDATE Charm BY ID
// ##############################################################
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Charm 
        SET charm_name = ?, spell = ?, effect = ?
        WHERE charm_id = ?;
    `;
    const VALUES = [data.charm_name, data.spell, data.effect, data.charm_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DELETE Charm BY ID
// ##############################################################
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Charm
    WHERE charm_id = ?;

    ALTER TABLE Charm AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.charm_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}