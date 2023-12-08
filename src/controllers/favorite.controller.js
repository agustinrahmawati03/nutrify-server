const { tokenReturned } = require('../middleware/token');
const Favorite = require('../models/favorite');

const addFavoriteFood = async (req, res) => {
  const { data } = tokenReturned(req, res);
  const userId = data._id;
  const favData = req.body;
  try {
    if (favData.user !== userId) {
      return res
        .status(404)
        .send({ message: 'unauthorized, forbidden' });
    }
    const favExist = await Favorite.findOne({
      food: favData.food,
      user: favData.user,
    });

    if (favExist !== null) {
      return res.send({
        message: 'the food have already exist on your favorite',
      });
    }

    const fav = await new Favorite(favData);
    fav.save();
    return res.send({
      message: 'favorite food data added successfully',
      body: {
        favorite: fav._id,
        favData,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavoriteFoods = async (req, res) => {
  const { data } = tokenReturned(req, res);
  const userId = data._id;
  try {
    const fav = await Favorite.find({ user: userId }).populate(
      'food'
    );
    res.status(201).json({ message: 'success', body: fav });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteFavFood = async (req, res) => {
  try {
    const foodFav = await Favorite.findOneAndDelete({
      _id: req.params.id,
    });
    if (foodFav === null) {
      return res
        .status(404)
        .json({ message: 'failed delete favorite food data' });
    }
    return res.status(200).json({
      message: 'favorite food data deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'failed delete favorite food data',
      error: error.message,
    });
  }
};

module.exports = { addFavoriteFood, getFavoriteFoods, deleteFavFood };
