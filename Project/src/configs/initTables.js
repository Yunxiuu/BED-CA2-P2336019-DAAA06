const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);
    const SQLSTATEMENT = `
    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS User;
    DROP TABLE IF EXISTS Player;
    DROP TABLE IF EXISTS Course;
    DROP TABLE IF EXISTS Charm;
    DROP TABLE IF EXISTS Task;
    DROP TABLE IF EXISTS PlayerUserRel;
    DROP TABLE IF EXISTS Messages;

    CREATE TABLE User (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO User (username, email, password) VALUES
    ('admin', 'a@a.com', '${hash}');

    CREATE TABLE Player (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name TEXT NOT NULL,
      level INT NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO Player (name, level) VALUES
    ('Owo', '1');
     
    CREATE TABLE Course (
      course_id INT PRIMARY KEY AUTO_INCREMENT,
      course_name TEXT,
      professor TEXT,
      description TEXT
    );
    
    INSERT INTO Course (course_name, professor, description) VALUES
    ('Potions', 'Severus Snape', 'Learn how to brew potions correctly.'),
    ('Astronomy', 'Aurora Sinistra', 'Learn the names of stars, constellations and planets, as well as charting their locations, movements, and environments.'),
    ('Defence Against the Dark Arts', 'Remus Lupin', 'Learn how to protect yourself against the Dark Arts and how to use offencive and protective spells,'),
    ('Transfiguration', 'Minerva McGonagall', 'Learn changing the form or appearance of an object, as well as changing it back. '),
    ('Charms', 'Filius Flitwick', 'Learn different spells');
    
    CREATE TABLE Charm (
      charm_id INT PRIMARY KEY AUTO_INCREMENT,
      charm_name TEXT,
      spell TEXT,
      effect TEXT
    );
    
    INSERT INTO Charm (charm_name, spell, effect) VALUES
    ('Levitation Charm', 'Wingardium Leviosa', 'Make objects fly, or levitate.'),
    ('Disarming Charm', 'Expelliarmus', 'Forces whatever an opponent is holding to fly out of their hand.'),
    ('Unlocking Charm', 'Alohomora', 'Unlocks doors and other locked objects.'),
    ('Patronus Charm', 'Expecto Patronum', 'Conjure a spirit guardian of your positive emotions to defend against dark creatures'),
    ('Memory Charm', 'Obliviate', 'Erases specific memories.');
    
    CREATE TABLE Task (
      task_id INT PRIMARY KEY AUTO_INCREMENT,
      task_name TEXT,
      description TEXT
    );
    
    INSERT INTO Task (task_name, description) VALUES
    ('Get your wand', 'A wand is the object through which a witch or wizard channels his or her magic. Pick up your wand and start the magic journy!'),
    ('Buy book', 'Go Diagon Alley buy your books for year 1.'),
    ('Go Platform 9¾', 'The Beginning of the Magical Journey.');

    CREATE TABLE Messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      message_text TEXT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO Messages (message_text, user_id) VALUES
      ("Hello world!", 1),
      ("Yummy!", 2),  
      ("I am the one", 3);

    CREATE TABLE PlayerUserRel (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      player_id INT NOT NULL
    );

    INSERT INTO PlayerUserRel (user_id, player_id) VALUES
      (1, 1),
      (1, 2),
      (1, 3);

    SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
    FROM PlayerUserRel
    INNER JOIN Player ON PlayerUserRel.player_id = Player.id
    INNER JOIN User ON PlayerUserRel.user_id = User.id;
    `;

    pool.query(SQLSTATEMENT, callback);
  }
});

