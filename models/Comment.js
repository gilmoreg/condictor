const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CommentSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  description: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };
