const express = require("express");

const exerciseRoute = express.Router();
const {
  addExercise,
  getAllExercises,
  getExerciseById,
  deleteExercise,
  getExerciseRecommendations,
} = require("../controllers/exercise.controller");

exerciseRoute.post("/", addExercise);
exerciseRoute.get("/", getAllExercises);
exerciseRoute.get("/recommendations", getExerciseRecommendations);
exerciseRoute.get("/:id", getExerciseById);
exerciseRoute.delete("/:id", deleteExercise);

module.exports = exerciseRoute;
