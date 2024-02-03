const pool = require('../services/db');

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Player (name, level)
    VALUES (?, ?);
    `;
    const VALUES = [data.name, data.level];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Player 
    SET name = ?
    WHERE id = ?;
    `;
    const VALUES = [data.name, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Player 
    WHERE id = ?;

    ALTER TABLE Player AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAllPokemonWithDexInfoByPlayerId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT  
    Pokemon.id, 
    Pokedex.name,
    Pokedex.type1,
    Pokedex.type2,
    Pokemon.owner_id, 
    Pokemon.dex_num,
    Pokemon.hp,
    Pokemon.atk,
    Pokemon.def,
    Player.name AS owner_name
    FROM Pokemon
    INNER JOIN Pokedex ON Pokemon.dex_num = Pokedex.number
    INNER JOIN Player ON Player.id = Pokemon.owner_id
    WHERE Player.id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}