const User = require('../models/dbModels.js');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    console.log('in user controller');
    const { name, email, password } = req.body;

    const newUser = await new User({ name, email, password }).save();

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
