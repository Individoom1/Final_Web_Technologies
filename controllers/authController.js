const User = require('../models/User');
const bcrypt = require('bcrypt');

// Регистрация пользователя
exports.register = async (req, res) => {
  const { username, password, firstName, lastName, age, gender, role, id } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('Пользователь с таким именем уже существует');
      return res.status(400).send('Пользователь с таким именем уже существует');
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Захешированный пароль:', hashedPassword);

    // Создаем нового пользователя
    const newUser = new User({
      id: id || generateUniqueId(), // Генерируем уникальный ID, если не передан
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      role: role || 'editor', // Устанавливаем роль по умолчанию как 'editor'
    });

    // Сохраняем нового пользователя в базе данных
    await newUser.save();
    console.log('Пользователь успешно зарегистрирован:', newUser);

    // Перенаправляем на страницу входа после успешной регистрации
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).send('Ошибка сервера при регистрации');
  }
};

// Генерация уникального ID
function generateUniqueId() {
  return 'user-' + Date.now(); // Генерируем ID на основе текущего времени
}

// Вход пользователя
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Отправленные данные:', req.body); // Логирование данных формы

    // Ищем пользователя по имени пользователя
    const user = await User.findOne({ username });
    if (!user) {
      console.error(`Пользователь с именем ${username} не найден.`);
      return res.status(400).send('Неверные учетные данные');
    }

    console.log('Введённый пароль:', password);
    console.log('Захешированный пароль из базы:', user.password);

    // Сравниваем введённый пароль с хэшированным в базе данных
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Результат сравнения пароля:', isMatch);

    // Если пароли не совпадают
    if (!isMatch) {
      console.error('Пароль не совпадает для пользователя:', username);
      return res.status(400).send('Неверные учетные данные');
    }

    // Если пароль верный, сохраняем данные о пользователе в сессии
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    // Перенаправляем пользователя на главную страницу
    res.redirect('/portfolio');
  } catch (err) {
    console.error('Ошибка при входе:', err);
    res.status(500).send('Ошибка сервера при входе');
  }
};

// Выход пользователя
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Ошибка при выходе из системы:', err);
      return res.status(500).send('Ошибка при выходе из системы');
    }
    console.log('Пользователь успешно вышел из системы.');
    res.redirect('/auth/login'); // Перенаправляем на страницу входа после выхода
  });
};