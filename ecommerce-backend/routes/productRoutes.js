import express from 'express';
import { getProducts, createProduct, getProductById, getCustomizableProducts, getProductsByCategory } from '../controllers/productsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, createProduct);

router.get('/:id', getProductById);

// Endpoint for customizable products: e.g. /api/products/customizable/list
router.get('/customizable/list', getCustomizableProducts);

// Endpoint to fetch products by category: e.g. /api/products/category/shirts
router.get('/category/:category', getProductsByCategory);

export default router;