const { Trade } = require("../models");
const { errorResponse, successResponse } = require("../utils/apiResponse");

const createTrade = async (req, res) => {
	var now = Date.now();
	// console.log("body", req.body);
	const data = req.body;
	let ingested = 0;
	for (i = 0; i < data.length; i++) {
		let dataToSave = {
			eventType: data[i].eventType,
			user: data[i].user,
			date: Date.now(),
		};
		if (dataToSave.eventType == "click") {
			// minus 3 seconds from now
			let interval = now - 3000;
			let lastClick = await Trade.find({
				user: dataToSave.user,
				eventType: "click",
				date: { $gte: interval },
			});
			if (lastClick.length > 0) {
				continue;
			} else {
				ingested++;
				let savedEvent = await Trade.create(dataToSave);
			}
		} else if (dataToSave.eventType == "pageView") {
			// minus 3 seconds from now
			let interval2 = now - 5000;
			let lastView = await Trade.find({
				user: dataToSave.user,
				eventType: "pageView",
				date: { $gte: interval2 },
			});
			if (lastView.length > 0) {
				continue;
			} else {
				ingested++;
				let savedEvent = await Trade.create(dataToSave);
			}
		} else {
			ingested++;
			let savedEvent = await Trade.create(dataToSave);
		}
	}
	return res.status(201).json({ ingested: ingested });
};

const getTrade = async (req, res) => {
	const trades = await Trade.find();
	return res.status(200).json(trades);
}

module.exports = {
	createTrade,
	getTrade,
};
