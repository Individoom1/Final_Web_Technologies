const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { checkRole } = require('../middlewares/authMiddleware');

router.get('/', portfolioController.getAllItems);

router.get('/create', checkRole('editor'), portfolioController.renderCreateForm);
router.post('/create', checkRole('editor'), portfolioController.createItem);

router.get('/edit/:id', checkRole('admin'), portfolioController.renderEditForm);
router.post('/edit/:id', checkRole('admin'), portfolioController.updateItem);

router.post('/delete/:id', checkRole('admin'), portfolioController.deleteItem);

module.exports = router;
