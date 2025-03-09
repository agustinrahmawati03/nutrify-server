const { tokenReturned } = require('../middleware/token');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const addExercise = async (req, res) => {
  try {
    // Ambil data dari request body
    const {
      name,
      icon,
      min_bmi,
      max_bmi,
      duration,
      description,
      benefit,
      tips,
    } = req.body;

    // Validasi data
    if (
      !name ||
      !icon ||
      !min_bmi ||
      !max_bmi ||
      !duration ||
      !description ||
      !benefit ||
      !tips
    ) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Buat dokumen exercise baru
    const newExercise = new Exercise({
      name,
      icon,
      min_bmi,
      max_bmi,
      duration,
      description,
      benefit,
      tips,
    });

    // Simpan ke database
    await newExercise.save();

    // Kirim respon sukses
    res.status(201).send({
      message: 'Exercise added successfully',
      exercise: newExercise,
    });
  } catch (error) {
    // Tangani kesalahan
    res.status(500).send({ message: error.message });
  }
};

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).send({
      message: 'Exercises retrieved successfully',
      data: { exercises },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).send({ message: 'Exercise not found' });
    }

    res.status(200).send({
      message: 'Exercise retrieved successfully',
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getExerciseRecommendations = async (req, res) => {
  try {
    const { data } = tokenReturned(req, res);
    const userId = data._id;
    const user = await User.findById(userId);
    const bmi = user.bmi;
    // Find exercises that match the bmi range
    const recommendedExercises = await Exercise.find({
      min_bmi: { $lte: parseFloat(bmi) },
      max_bmi: { $gte: parseFloat(bmi) },
    });

    res.status(200).send({
      message: 'Recommended exercises retrieved successfully',
      data: {
        recommendations: recommendedExercises,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      icon,
      min_bmi,
      max_bmi,
      duration,
      description,
      benefit,
      tips,
    } = req.body;

    if (
      !name ||
      !icon ||
      min_bmi == null ||
      min_bmi == '' ||
      !max_bmi ||
      !duration ||
      !description ||
      !benefit ||
      !tips
    ) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      { name, icon, min_bmi, max_bmi, duration, description, benefit, tips },
      { new: true } // Return the updated document
    );

    if (!updatedExercise) {
      return res.status(404).send({ message: 'Exercise not found' });
    }

    res.status(200).send({
      message: 'Exercise updated successfully',
      data: {
        exercise: updatedExercise,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExercise = await Exercise.findByIdAndDelete(id);

    if (!deletedExercise) {
      return res.status(404).send({ message: 'Exercise not found' });
    }

    res.status(200).send({
      message: 'Exercise deleted successfully',
      data: {
        deletedExercise,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addExercise,
  getAllExercises,
  getExerciseById,
  getExerciseRecommendations,
  updateExercise,
  deleteExercise,
};
