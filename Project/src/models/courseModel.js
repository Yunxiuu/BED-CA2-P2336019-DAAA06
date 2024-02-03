const pool = require('../services/db');

// ##############################################################
// CREATE NEW COURSE
// ##############################################################
module.exports.createCourse = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Course (course_name, professor, description)
    VALUES (?, ?, ?);
`   ;
    const VALUES = [data.course_name, data.professor, data.description];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// READ ALL COURSE
// ##############################################################
module.exports.readCourse = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Course;
`   ;

    pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// SELECT Course BY ID
// ##############################################################
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Course
        WHERE course_id = ?;
    `   ;
    const VALUES = [data.course_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// UPDATE Course BY ID
// ##############################################################
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Course 
        SET course_name = ?, professor = ?, description = ?
        WHERE course_id = ?;
    `;
    const VALUES = [data.course_name, data.professr, data.description, data.course_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DELETE Course BY ID
// ##############################################################
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Course
    WHERE course_id = ?;

    ALTER TABLE Course AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.Course_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}