const Joi = require("joi");

const createTrade = {
	body: Joi.array().items(
		Joi.object({
			// Object schema
			user: Joi.number().required(),
			eventType: Joi.string().required(),
		})
	),
};

module.exports = {
	createTrade,
};
