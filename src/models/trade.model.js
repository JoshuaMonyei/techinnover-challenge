const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON } = require("./plugins");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const tradeSchema = mongoose.Schema({
	eventType: String,
	user: Number,
	date: Date,
});

tradeSchema.plugin(autoIncrement.plugin, {
	model: "Trade",
	field: "id",
	startAt: 1,
});

// add plugin that converts mongoose response to JSON and returns preferred format
tradeSchema.plugin(toJSON);
const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;
