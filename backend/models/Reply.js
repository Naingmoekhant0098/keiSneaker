const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  commentId:{
    type: String,
    required: true,
  },
  reply: {
    type: String,
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

const reply = mongoose.model("reply", replySchema);
module.exports = reply;
