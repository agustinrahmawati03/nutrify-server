require('dotenv').config();
const { MONGODB_PASS, MONGODB_USER } = process.env;

const mongoose = require('mongoose');

const database_url = 'mongodb://localhost:27017/db_nutrify';

const database = mongoose.connect(
  'mongodb://127.0.0.1:27017/db_nutrify'
);
// `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@nutrify-server.muqa09o.mongodb.net/?retryWrites=true&w=majority`

module.exports = database;
