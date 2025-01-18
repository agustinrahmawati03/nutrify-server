const express = require("express");

const exerciseRoute = express.Router();
const { tokenVerified, forUser, onlyAdmin } = require('../middleware/token');
const {
  addExercise,
  getAllExercises,
  getExerciseById,
  getExerciseRecommendations,
  updateExercise,
  deleteExercise,
} = require("../controllers/exercise.controller");

exerciseRoute.post("/", addExercise);
exerciseRoute.get("/", getAllExercises);
exerciseRoute.get("/recommendations", [tokenVerified, forUser], getExerciseRecommendations);
exerciseRoute.get("/:id", getExerciseById);
exerciseRoute.put("/:id", updateExercise);
exerciseRoute.delete("/:id", deleteExercise);

module.exports = exerciseRoute;
