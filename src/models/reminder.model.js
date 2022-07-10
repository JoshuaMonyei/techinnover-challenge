const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON } = require("./plugins");

const reminderSchema = mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose response to JSON and returns preferred format
reminderSchema.plugin(toJSON);

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
