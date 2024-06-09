const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
  },
  replies : {
    type : Array,
    default :[]
  },
  likes : {
    type : Array,
    default :[]
  },
  unLikes : {
    type : Array,
    default :[]
  }
},{timestamps : true});

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;
