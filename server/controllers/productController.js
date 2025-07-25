import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const { category, sort } = req.query;

  const filter = {
    ...(category ? { category } : {}),
    stock: { $gt: 0 }
  };

  let sortOption = {};
  if (sort === 'price_asc') sortOption = { price: 1 };
  else if (sort === 'price_desc') sortOption = { price: -1 };
  else if (sort === 'alphabet_asc') sortOption = { title: 1 };
  else if (sort === 'alphabet_desc') sortOption = { title: -1 };

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

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.keys(updatedProduct).forEach((key) => {
      product[key] = updatedProduct[key];
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
    console.log('Trying to delete product:', productId);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};