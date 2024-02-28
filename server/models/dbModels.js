const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);

        this.password = hash;

        return next();
      });
    });
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

module.exports = mongoose.model('User', userSchema);

// const { Pool } = require('pg');

// const PG_URI = 'postgres://hycklnut:8shlxyjV91GMAwj4DW7vCxI76BIi4ttj@stampy.db.elephantsql.com/hycklnut';

// const pool = new Pool({
//   connectionString: PG_URI
// });

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query: ', text);
//     return pool.query(text, params, callback);
//   }
// };
