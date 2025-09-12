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
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const saved = await product.save();
  res.status(201).json(saved);
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    console.log(updatedProduct)

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.keys(updatedProduct).forEach((key) => {
      if (key === 'rating') {
        const newRating = updatedProduct["rating"];
        console.log(newRating)
        console.log(product.rating)
        const totalRating =
          product.rating * product.ratingCount + newRating;
        product.ratingCount += 1;
        product.rating = totalRating / product.ratingCount;
      } else {
      product[key] = updatedProduct[key];
      }
    });

    const saved = await product.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};