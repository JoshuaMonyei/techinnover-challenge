const mongoose = require('mongoose');
const validator = require("validator");
const { toJSON } = require("./plugins");

const tradeSchema = mongoose.Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;