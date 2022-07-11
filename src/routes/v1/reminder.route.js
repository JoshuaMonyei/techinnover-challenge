const express = require("express");
const validate = require("../../middlewares/validate");
const reminderValidation = require("../../validations/reminder.validation");
const reminderController = require("../../controllers/reminder.controller");

const router = express.Router();

router.post("", reminderController.createReminder);
router.get("", reminderController.getAllReminders);
router
	.route("/:id")
	.get(reminderController.getReminder)
	.delete(reminderController.notAllowed)
	.put(reminderController.notAllowed)
	.patch(reminderController.notAllowed);

module.exports = router;
