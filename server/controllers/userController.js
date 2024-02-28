// CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT NOW()
// );

const User = require('../models/dbModels.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    console.log('in user controller');
    const { name, email, password } = req.body;
    console.log(req.body);

    const newUser = await new User({ name, email, password }).save();

    console.log(newUser);

    if (newUser) {
      res.locals.newUser = newUser;
      return next();
    } else {
      res.status(403).json('Cannot create new user!');
    }
  } catch (err) {
    return next(err);
  }
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  // Get the user from the database
  const query = `SELECT * FROM users WHERE username = '${username}';`;
  db.query(query)
    .then((data) => {
      const user = data.rows[0];

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return next(err);

        if (result) {
          // Passwords match
          console.log('confirmed');
          res.locals.user = user;
          return next();
        } else {
          // Passwords don't match
          return next(new Error('Invalid password'));
        }
      });
    })
    .catch((err) => next(err));
};

userController.updateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  // Hash the password before updating it in the database
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return next(err);

    const query = `UPDATE users SET email = '${email}', password = '${hash}' WHERE username = '${username}';`;
    db.query(query)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch((err) => next(err));
  });
};

userController.deleteUser = (req, res, next) => {
  const { username } = req.body;
  const query = `DELETE FROM users WHERE username = '${username}';`;
  db.query(query)
    .then((data) => {
      console.log(data);
      return next();
    })
    .catch((err) => next(err));
};

userController.getAllUsers = (req, res, next) => {
  const query = 'SELECT * FROM users;';
  db.query(query)
    .then((data) => {
      res.locals.users = data.rows;
      return next();
    })
    .catch((err) => next(err));
};

userController.getUserById = (req, res, next) => {
  const { id } = req.body;
  const query = `SELECT * FROM users WHERE id = ${id};`;
  db.query(query)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => next(err));
};

module.exports = userController;
