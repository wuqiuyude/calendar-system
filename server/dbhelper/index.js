/**
 *  get next id
 * @param  {string} options.sequenceName
 * @return {number}
 */
const mongoose = require("mongoose");
const Counters = mongoose.model("Counters");

const findBySequenceName = async sequenceName => {
  const query = Counters.findOne({ id: sequenceName });
  let res = null;
  const handler = (err, counter) => {
    if (err) {
      res = {};
    } else {
      res = counter;
    }
  };
  await query.exec(handler);
  return res;
};
const addCounter = async sequenceName => {
  const newCounter = new Counters({
    id: sequenceName,
    sequence_value: 0
  });
  const counter = await newCounter.save();
  return counter;
};

exports.getNextSequenceValue = async sequenceName => {
  const sequence = await findBySequenceName(sequenceName);
  if (!sequence) {
    const c = await addCounter(sequenceName);
    return c.sequence_value;
  }
  const query = Counters.findOneAndUpdate(
    { id: sequenceName },
    {
      $set: {
        state: 1,
        sequence_value: sequence.sequence_value + 1
      }
    },
    { new: true }
  );
  let res = null;
  const handler = (err, sequenceDocument) => {
    if (err) {
      res = {};
    } else {
      res = sequenceDocument;
    }
  };
  await query.exec(handler);
  return res.sequence_value;
};
