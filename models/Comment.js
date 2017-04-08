import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const CommentSchema = mongoose.Schema({
  owner: String,
  created: Date,
  description: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
