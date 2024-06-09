const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    headLine: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    photo: {
      type: String,
    },
    isSubmit: {
      type: String,
      default: 'pending',
    },
    likes : {
        type : Array,
        default :[]
    },
    unLikes : {
        type : Array,
        default :[]
    },
    createdAt: {
      type: Date,
      default: new Date().getTime(),
    },
  },
  { timestamps: true }
);

const review = mongoose.model("review", reviewSchema);
module.exports = review;
