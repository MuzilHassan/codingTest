import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  comment: {
    type: String,
    required: [true, "comment is required"],
    validate: {
      validator: function (val: string) {
        return val.length <= 1000;
      },
      message: "comment lenght should be less than 1000",
    },
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
