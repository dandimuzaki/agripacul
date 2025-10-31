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
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  location: String,
  stock: Number,
  image: String,
  sold: Number,
  status: String,
  unit: String,
  weight: Number,
}, { timestamps: true });

productSchema.pre('findOneAndDelete', async function (next) {
  try {
    const productId = this.getQuery()['_id'];
    if (!productId) return next();

    // Update all carts that contain this product
    await mongoose.model('Cart').updateMany(
      { 'items.product': productId },
      { $pull: { items: { product: productId } } }
    );

    console.log(`✅ Removed product ${productId} from all carts`);
    next();
  } catch (error) {
    console.error('❌ Error cleaning carts:', error.message);
    next(error);
  }
});


const Product = mongoose.model('Product', productSchema);

export default Product;
