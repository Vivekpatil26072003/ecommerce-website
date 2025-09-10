import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, images, category, availableSizes, availableColors, isCustomizable, allowTextCustomization, allowImageUpload } = req.body;
  try {
    const product = new Product({ name, description, price, image, images, category, availableSizes, availableColors, isCustomizable, allowTextCustomization, allowImageUpload });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCustomizableProducts = async (req, res) => {
  try {
    const products = await Product.find({ isCustomizable: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};