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
  subcategory: String,
  rating: Number,
  location: String,
  stock: Number,
  image: String,
  clusterLabel: String,
  brand: String,
  tags: [String],
  sold: Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
