import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema({
  averageRating: {
    type: Number,
    required: true,
  },
  counts: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Metrics = mongoose.model("Metrics", metricsSchema);
export default Metrics;
