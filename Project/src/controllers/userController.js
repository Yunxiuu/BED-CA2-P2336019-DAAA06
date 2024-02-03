const model = require("../models/userModel");

module.exports.createUser = (req, res, next) => {
  if (
    req.body.username == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    res.status(400).send("Error: username is undefined");
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewPlayer:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results);
    }
  };

  model.insertUser(data, callback);
};

module.exports.getUser = (req, res, next) => {
  if (req.params.userId == undefined) {
    res.status(400).json({
      message: "Error: userId is undefined",
    });
    return;
  }

  const data = {
    userId: req.params.userId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getUser:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectUser(data, callback);
};

module.exports.getAllUser = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllUser(callback);
};

module.exports.updateUser = (req, res, next) => {
  if (req.params.userId == undefined) {
    res.status(400).json({
      message: "Error: userId is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    userId: req.params.userId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateUser:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(204).send();
    }
  };

  model.updateUser(data, callback);
};

module.exports.deleteUser = (req, res, next) => {
  if (req.params.userId == undefined) {
    res.status(400).json({
      message: "Error: userId is undefined",
    });
    return;
  }

  const data = {
    userId: req.params.userId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteUser:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else res.status(204).send();
    }
  };

  model.deleteUser(data, callback);
};

module.exports.getAllPlayersByUser = (req, res, next) => {
  if (res.locals.userId == undefined && req.params.userId == undefined) {
    res.status(400).send("Error: userId is undefined");
    return;
  }

  const data = {
    userId: res.locals.userId || req.params.userId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllPlayersByUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllPlayersByUser(data, callback);
};

module.exports.createPlayerUserRel = (req, res, next) => {
  console.log("res.locals:", res.locals);
  if (res.locals.userId == undefined || res.locals.playerId == undefined) {
    res.status(400).send("Error: userId or playerId is undefined");
    return;
  }

  const data = {
    userId: res.locals.userId,
    playerId: res.locals.playerId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error insertPlayerUserRel:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message:
          "Player " +
          res.locals.playerId +
          " created for User " +
          res.locals.userId +
          " successfully.",
      });
    }
  };

  model.insertPlayerUserRel(data, callback);
};

module.exports.getPlayerByUser = (req, res, next) => {
  if (req.params.userId == undefined || req.params.playerId == undefined) {
    res.status(400).send("Error: userId or playerId is undefined");
    return;
  }

  const data = {
    userId: req.params.userId,
    playerId: req.params.playerId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getPlayerByUser:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Player not found",
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectPlayerByUser(data, callback);
};

module.exports.deletePlayerByUser = (req, res, next) => {
  if (req.params.userId == undefined || req.params.playerId == undefined) {
    res.status(400).send("Error: userId or playerId is undefined");
    return;
  }

  req.params.id = req.params.playerId;
  next();
};

module.exports.updatePlayerByUser = (req, res, next) => {
  if (req.params.userId == undefined || req.params.playerId == undefined) {
    res.status(400).send("Error: userId or playerId is undefined");
    return;
  }

  req.params.id = req.params.playerId;
  next();
};

module.exports.deletePlayerUserRel = (req, res, next) => {
  if (res.locals.userId == undefined || req.params.playerId == undefined) {
    res.status(400).send("Error: userId or playerId is undefined");
    return;
  }

  const data = {
    userId: res.locals.userId,
    playerId: req.params.playerId,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deletePlayerUserRel:", error);
      res.status(500).json(error);
    } else {
      console.log("deletePlayerUserRel results:", results);
      res.status(204).send();
    }
  };

  model.deletePlayerUserRel(data, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
  if (req.body.username == undefined || req.body.password == undefined) {
    res.status(400).json({
      message: "Error: username or password is undefined",
    });
    return;
  }

  const data = {
    username: req.body.username
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error login:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "User not found",
        });
      } else {
        res.locals.userId = results[0].id;
        res.locals.username = results[0].username;
        res.locals.hash = results[0].password;
        res.locals.message = "User " + res.locals.username + " logged in successfully.";
        next();
      }
    }
  };

  model.selectUserByUsername(data, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
  if (
    req.body.username == undefined ||
    req.body.email == undefined ||
    req.body.password == undefined
  ) {
    res.status(400).send("Error: username is undefined");
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error register:", error);
      res.status(500).json(error);
    } else {
      res.locals.userId = results.insertId;
      res.locals.username = req.body.username;
      res.locals.message = "User " + req.body.username + " created successfully.";
      next();
    }
  };

  model.insertUser(data, callback);
};

//////////////////////////////////////////////////////
// MIDLEWARE CONTROLLER FOR CHECK IF USERNAME EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  if (req.body.username == undefined || req.body.email == undefined) {
    res.status(400).send("Error: username or email is undefined");
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUsernameOrEmailExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(409).json({
          message: "Username or email already exists",
        });
      } else next();
    }
  };

  model.selectUserByUsernameOrEmail(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE CONTROLLER FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////
module.exports.checkPlayerBelongsToUser = (req, res, next) => {
  if (res.locals.userId == undefined) {
    res.status(400).send("Error: userId is undefined");
    return;
  }
  if (req.body.playerId == undefined && req.params.playerId == undefined) {
    res.status(400).send("Error: playerId is undefined");
    return;
  }

  const data = {
    userId: res.locals.userId,
    playerId: req.body.playerId || req.params.playerId
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkPlayerBelongsToUser:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: "Player not found",
        });
      } else next();
    }
  };

  model.selectPlayerByUser(data, callback);
}