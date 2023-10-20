const Product = require('../models/Product');

const adminController = {};

adminController.listAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(parseInt(limit));
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products for admin' });
  }
};

adminController.getProductDetail = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product detail for admin' });
  }
};

adminController.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(productId, { name, price, category }, { new: true });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product for admin' });
  }
};

adminController.viewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error viewing product for admin' });
  }
};

adminController.changeProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status } = req.body;

    const product = await Product.findByIdAndUpdate(productId, { status }, { new: true });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product status changed successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error changing product status for admin' });
  }
};

module.exports = adminController;
