import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { category, sortByPrice, sortByRating, search } = req.query;

  const filter = {
    ...(category ? { category } : {}),
    ...(search ? { title: { $regex: search, $options: 'i' } } : {}),
    stock: { $gt: 0 }
  };

  let sortOption = {};
  if (sortByPrice === 'asc') sortOption = { price: 1 };
  else if (sortByPrice === 'desc') sortOption = { price: -1 };
  else if (sortByRating === 'asc') sortOption = { rating: 1 };
  else if (sortByRating === 'desc') sortOption = { rating: -1 };

  try {
    const products = await Product.find(filter).sort(sortOption);
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Products not found',
        errors: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      errors: err.message
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        errors: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      errors: err.message
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      errors: err.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
  const product = new Product(req.body);
  const saved = await product.save();
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: saved
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      errors: err.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        errors: null
      });
    }

    Object.keys(updatedProduct).forEach((key) => {
      if (key === 'rating') {
        const newRating = updatedProduct["rating"];
        const totalRating =
          product.rating * product.ratingCount + newRating;
        product.ratingCount += 1;
        product.rating = totalRating / product.ratingCount;
      } else {
      product[key] = updatedProduct[key];
      }
    });

    const saved = await product.save();
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: saved
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      errors: err.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        errors: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      errors: err.message
    });
  }
};