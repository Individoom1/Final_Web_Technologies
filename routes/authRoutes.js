const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Страница входа (GET)
router.get('/login', (req, res) => res.render('auth/login'));

// Обработка входа (POST)
router.post('/login', authController.login);

// Страница регистрации (GET)
router.get('/register', (req, res) => res.render('auth/register'));

// Обработка регистрации (POST)
router.post('/register', authController.register);

// Выход (GET)
router.get('/logout', authController.logout);

module.exports = router;
