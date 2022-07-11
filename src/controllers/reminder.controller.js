const { Reminder } = require("../models");

const createReminder = async (req, res) => {
	const { user, description, date } = req.body;
	const reminder = await Reminder.create({
		user,
		description,
		date,
	});
	return res.status(201).json(reminder);
};

const getAllReminders = async (req, res) => {
	if (req.query.user && req.query.after) {
		// convert epoch time to string
		const time = new Date(parseInt(req.query.after));
		const reminders = await Reminder.find({
			user: req.query.user,
			date: { $gt: time },
		}).sort({ id: 1 });
		return res.status(200).json(reminders);
	} else if (req.query.user) {
		const reminders = await Reminder.find({ user: req.query.user }).sort({ id: 1});
		return res.status(200).json(reminders);
	} else if (req.query.after) {
		let time = new Date(parseInt(req.query.after));
		const reminders = await Reminder.find({ date: { $gt: time } }).sort({ id: 1});
		return res.status(200).json(reminders);
	} else {
		const reminders = await Reminder.find().sort({ id: 1});
		return res.status(200).json(reminders);
	}
};

const getReminder = async (req, res) => {
	const reminder = await Reminder.findOne({ id: req.params.id })
	if (!reminder) {
		return res.status(404).json({ message: "ID not found" });
	}
	return res.status(200).json(reminder);
};

const notAllowed = async (req, res) => {
    // for CRUD operations outside create, we don't need to do anything here
    return res.status(405).json({ message: "Method not allowed" });
}

module.exports = {
	createReminder,
	getAllReminders,
	getReminder,
    notAllowed,
};
