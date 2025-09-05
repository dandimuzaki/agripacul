import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  rating: Number,
  location: String,
  stock: Number,
  image: String,
  sold: Number,
  status: String,
  unit: String,
  weight: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
