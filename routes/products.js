const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/list', productController.listProducts);
router.put('/update/:productId', productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);
router.get('/view/:productId', productController.viewProduct);

module.exports = router;

