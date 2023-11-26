const mongoose = require('mongoose');
const { Schema } = mongoose;

const skemaFavFood = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  food: {
    type: mongoose.ObjectId,
    ref: 'Food',
  },
});

const favFood = mongoose.model('Favorite', skemaFavFood);

module.exports = favFood;
