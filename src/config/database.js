require('dotenv').config();
const { MONGODB_URI } = process.env;

const mongoose = require('mongoose');

const database_url = 'mongodb://localhost:27017/db_nutrify';

const database = mongoose.connect(
  'mongodb://127.0.0.1:27017/db_nutrify'
);

module.exports = database;
