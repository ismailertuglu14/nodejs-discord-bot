const Mongoose = require("mongoose");

const MessageSchema = new Mongoose.Schema({
  content: String,
  username: String,
  messageId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const MessageModel = Mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
