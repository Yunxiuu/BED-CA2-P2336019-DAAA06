const pool = require('../services/db');

module.exports.insertUser = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO User (username, email, password) VALUES (?, ?, ?)`;
  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectUser = (data, callback) => {
  const SQLSTATEMENT = `
  SELECT id, username, email, created_on, updated_on, last_login_on
  FROM User WHERE id = ?`;
  const VALUES = [data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAllUser = (callback) => {
  const SQLSTATEMENT = `
  SELECT id, username, email, created_on, updated_on, last_login_on
  FROM User`;

  pool.query(SQLSTATEMENT, callback);
};

module.exports.updateUser = (data, callback) => {
  const SQLSTATEMENT = `UPDATE User SET username = ?, email = ?, password = ? WHERE id = ?`;
  const VALUES = [data.username, data.email, data.password, data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteUser = (data, callback) => {
  const SQLSTATEMENT = `DELETE FROM User WHERE id = ?`;
  const VALUES = [data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAllPlayersByUser = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
      FROM PlayerUserRel
      INNER JOIN Player ON PlayerUserRel.player_id = Player.id
      INNER JOIN User ON PlayerUserRel.user_id = User.id
      WHERE PlayerUserRel.user_id = ?
    `;
  const VALUES = [data.userId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertPlayerUserRel = (data, callback) => {
  const SQLSTATEMENT = `INSERT INTO PlayerUserRel (user_id, player_id) VALUES (?, ?)`;
  const VALUES = [data.userId, data.playerId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deletePlayerUserRel = (data, callback) => {
  const SQLSTATEMENT = `DELETE FROM PlayerUserRel WHERE user_id = ? AND player_id = ?`;
  const VALUES = [data.userId, data.playerId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectPlayerUserRel = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM PlayerUserRel WHERE user_id = ? AND player_id = ?`;
  const VALUES = [data.userId, data.playerId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectPlayerByUser = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
      FROM PlayerUserRel
      INNER JOIN Player ON PlayerUserRel.player_id = Player.id
      INNER JOIN User ON PlayerUserRel.user_id = User.id
      WHERE PlayerUserRel.user_id = ? AND PlayerUserRel.player_id = ?
    `;
  const VALUES = [data.userId, data.playerId];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserByUsername = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM User WHERE username = ?`;
  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserByUsernameOrEmail = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM User WHERE username = ? OR email = ?`;
  const VALUES = [data.username, data.email];

  pool.query(SQLSTATEMENT, VALUES, callback);
}


