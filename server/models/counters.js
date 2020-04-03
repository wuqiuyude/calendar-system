const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Counters model
 * id
 * sequence_value
 * @type {mongoose}
 */
const CountersSchema = new Schema({
  sequence_value: Number
});

/**
 * define model Counters
 * @type {[type]}
 */
const Counters = mongoose.model("Counters", CountersSchema);

module.exports = Counters;
