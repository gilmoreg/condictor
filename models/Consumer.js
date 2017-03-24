import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const ConsumerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [mongoose.Schema.Types.ObjectId],
});

const Consumer = mongoose.model('Consumer', ConsumerSchema);

module.exports = Consumer;
