const express = require("express");
const validate = require("../../middlewares/validate");
const reminderValidation = require("../../validations/reminder.validation");
const reminderController = require("../../controllers/reminder.controller");

const router = express.Router();

module.exports = router;
