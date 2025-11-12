const express = require('express');
const { createProduct, getAllProducts, getProductByID, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router =  express.Router();

router.route('/').get(getAllProducts)
router.route('/:id').get(getProductByID)

router.route('/').post(protect, isAdmin, createProduct);
router.route('/:id').put(protect, isAdmin, updateProduct).delete(protect, isAdmin, deleteProduct);


module.exports = router;