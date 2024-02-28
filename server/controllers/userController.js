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

userController.verifyUser = async (req, res, next) => {
  try {
    console.log('in user controller');
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('user.comparePassword: ', await user.comparePassword(password))
    console.log('user: ', user);

    if (user) {
      console.log('in the first if');
      if (await user.comparePassword(password)) {
        console.log('in the second if');
        res.locals.user1 = user;
        return next();
      }
    } else {
      res.status(403).json('Cannot find user!');
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
