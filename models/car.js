const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  brandName: { type: String, required: true },
  modelName: { type: String, required: true },
  modelEnergy: { type: String, required: true },
  modelPrice: { type: Number, required: true },
  dateBuy: { type: Date, required: true},
});

module.exports = mongoose.model('Car', carSchema);