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

exerciseRoute.post("/" , [tokenVerified, onlyAdmin] , addExercise);
exerciseRoute.get("/", getAllExercises);
exerciseRoute.get("/recommendations", [tokenVerified, forUser], getExerciseRecommendations);
exerciseRoute.get("/:id", getExerciseById);
exerciseRoute.put("/:id", [tokenVerified, onlyAdmin], updateExercise);
exerciseRoute.delete("/:id", [tokenVerified, onlyAdmin],  deleteExercise);

module.exports = exerciseRoute;
