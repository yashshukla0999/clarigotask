const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware('admin'));

router.get('/products', adminController.listAllProducts);
router.get('/products/:productId', adminController.getProductDetail);
router.put('/products/:productId', adminController.updateProduct);
router.get('/products/view/:productId', adminController.viewProduct);
router.patch('/products/status/:productId', adminController.changeProductStatus);

module.exports = router;
