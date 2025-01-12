const Exercise = require("../models/exercise");

const addExercise = async (req, res) => {
  try {
    // Ambil data dari request body
    const { name, min_bbi, max_bbi, duration, description } = req.body;

    // Validasi data
    if (!name || !min_bbi || !max_bbi || !duration || !description) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Buat dokumen exercise baru
    const newExercise = new Exercise({
      name,
      min_bbi,
      max_bbi,
      duration,
      description,
    });

    // Simpan ke database
    await newExercise.save();

    // Kirim respon sukses
    res.status(201).send({
      message: "Exercise added successfully",
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
      message: "Exercises retrieved successfully",
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
      return res.status(404).send({ message: "Exercise not found" });
    }

    res.status(200).send({
      message: "Exercise retrieved successfully",
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
    const { bbi } = req.query;

    if (!bbi) {
      return res.status(400).send({ message: "BBI is required" });
    }

    // Find exercises that match the BBI range
    const recommendedExercises = await Exercise.find({
      min_bbi: { $lte: parseFloat(bbi) },
      max_bbi: { $gte: parseFloat(bbi) },
    });

    res.status(200).send({
      message: "Recommended exercises retrieved successfully",
      data: {
        recommendations: recommendedExercises,
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
      return res.status(404).send({ message: "Exercise not found" });
    }

    res.status(200).send({
      message: "Exercise deleted successfully",
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
  deleteExercise,
  getExerciseRecommendations,
};
