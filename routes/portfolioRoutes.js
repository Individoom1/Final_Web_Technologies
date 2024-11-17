const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { checkRole } = require('../middlewares/authMiddleware');

// Показать все элементы портфолио (доступно всем авторизованным пользователям)
router.get('/', portfolioController.getAllItems);

// Создать новый элемент (доступно редакторам и администраторам)
router.get('/create', checkRole('editor'), portfolioController.renderCreateForm);
router.post('/create', checkRole('editor'), portfolioController.createItem);

// Редактировать элемент (только для администраторов)
router.get('/edit/:id', checkRole('admin'), portfolioController.renderEditForm);
router.post('/edit/:id', checkRole('admin'), portfolioController.updateItem);

// Удалить элемент (только для администраторов)
router.post('/delete/:id', checkRole('admin'), portfolioController.deleteItem);

module.exports = router;
