const { tokenReturned } = require('../middleware/token');
const Food = require('../models/food');
const User = require('../models/user');

const getAllFoods = async (req, res) => {
  try {
    const userData = tokenReturned(req, res);

    if (!userData) {
      // User is not logged in, return all foods normally
      const food = await Food.find();
      return res.status(200).send({ message: 'success', food });
    } else {
      const userId = userData._id;
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const bmi = user.bmi;
      const caloriNeeded = user.caloriNeeded;

      let foodQuery = await Food.find();

      if (bmi < 18) {
        // Underweight: Sort by highest protein first, then by fat
        foodQuery.sort((a, b) => b.protein - a.protein || b.fat - a.fat);
      } else if (bmi > 25) {
        // Overweight: Sort by lowest fat first
        foodQuery.sort((a, b) => a.fat - b.fat || a.cal - b.cal);
      } else {
        // Normal BMI: Find foods closest to caloriNeeded
        foodQuery.sort(
          (a, b) =>
            Math.abs(a.cal - caloriNeeded) - Math.abs(b.cal - caloriNeeded)
        );
      }

      return res.status(200).send({
        message: 'Recommended foods retrieved successfully',
        food: foodQuery,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const addManyFoods = async (req, res) => {
  try {
    // Ubah string ID kategori menjadi ObjectId
    const foodsWithObjectId = req.body.map((food) => ({
      ...food,
      categories: food.categories.map((category) => category),
    }));

    await Food.insertMany(foodsWithObjectId);

    res.status(201).send({
      message: 'Food added successfully',
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFoodByCategory = async (req, res) => {
  try {
    const food = await Food.find({
      categories: req.params.category,
    });

    if (food === null) {
      res.status(404).json({ message: 'category not found' });
    }

    res.status(200).send({ message: 'success', food });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFoodByQuery = async (req, res) => {
  try {
    const food = await Food.find({
      name: { $regex: req.query.name, $options: 'i' },
    });

    return res.status(200).send({ message: 'success', food });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFoodByID = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.id });

    return res.send(food);
  } catch (error) {
    return res.status(404).send({
      message: 'opps food not found!',
    });
  }
};

module.exports = {
  getAllFoods,
  addManyFoods,
  getFoodByCategory,
  getFoodByQuery,
  getFoodByID,
};
