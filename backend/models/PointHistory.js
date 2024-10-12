const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointsHistorySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  claimedAt: { type: Date, default: Date.now },
});

const PointsHistory = mongoose.model('PointsHistory', PointsHistorySchema);
module.exports = PointsHistory;
