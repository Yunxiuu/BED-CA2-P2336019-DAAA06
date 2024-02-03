const pool = require('../services/db');

// ##############################################################
// CREATE NEW Task
// ##############################################################
module.exports.createTask = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Task (task_name, description)
    VALUES (?, ?);
`   ;
    const VALUES = [data.task_name, data.description];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// READ ALL Task
// ##############################################################
module.exports.readTask = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Task;
`   ;

    pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// SELECT Task BY ID
// ##############################################################
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Task
        WHERE task_id = ?;
    `   ;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// UPDATE Task BY ID
// ##############################################################
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Task 
        SET task_name = ?, description = ?
        WHERE task_id = ?;
    `;
    const VALUES = [data.task_name, data.description, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DELETE Task BY ID
// ##############################################################
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Task
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}