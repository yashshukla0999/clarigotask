const Product = require('../models/Product');

const productController = {};

productController.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.create({ name, price, category });
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

productController.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(parseInt(limit));
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error listing products' });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(productId, { name, price, category }, { new: true });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

productController.viewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error viewing product' });
  }
};

module.exports = productController;
