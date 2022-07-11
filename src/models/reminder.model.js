const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON } = require("./plugins");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const reminderSchema = mongoose.Schema({
	user: Number,
	description: String,
	date: Date,
});

reminderSchema.plugin(autoIncrement.plugin, {
	model: "Reminder",
	field: "id",
	startAt: 1,
});

// add plugin that converts mongoose response to JSON and returns preferred format
reminderSchema.plugin(toJSON);

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
