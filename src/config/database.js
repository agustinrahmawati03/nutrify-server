require('dotenv').config();
const { MONGODB_PASS, MONGODB_USER } = process.env;

const mongoose = require('mongoose');

const database_url =
  'mongodb+srv://nutrify:nutrify@cluster0.s9j8c.mongodb.net/nutrisiku?retryWrites=true&w=majority&appName=Cluster0';

const database = mongoose.connect(
  process.env.NODE_ENV === 'development'
    ? 'mongodb://127.0.0.1:27017/nutrify'
    : database_url
);
// const database = mongoose.connect ('mongodb://127.0.0.1:27017/nutrify');
module.exports = database;
