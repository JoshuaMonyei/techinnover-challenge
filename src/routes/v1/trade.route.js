const express = require("express");
const validate = require("../../middlewares/validate");
const tradeValidation = require("../../validations/trade.validation");
const tradeController = require("../../controllers/trade.controller");

const router = express.Router();

module.exports = router;
