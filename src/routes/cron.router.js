const express = require("express");

const cronRoute = express.Router();
const {
  collectUsers,
  sendReminders,
} = require("../controllers/reminder.controller");

// cron reminders
cronRoute.get("/reminders/collect", collectUsers);
cronRoute.get("/reminders/send", sendReminders);

module.exports = cronRoute;
