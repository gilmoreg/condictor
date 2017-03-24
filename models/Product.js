import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
