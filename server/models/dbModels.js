const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
