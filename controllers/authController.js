const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { username, password, firstName, lastName, age, gender, role, id } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error('Пользователь с таким именем уже существует');
      return res.status(400).send('Пользователь с таким именем уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Захешированный пароль:', hashedPassword);

    const newUser = new User({
      id: id || generateUniqueId(), 
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
      gender,
      role: role || 'editor',
    });

    await newUser.save();
    console.log('Пользователь успешно зарегистрирован:', newUser);

    res.redirect('/auth/login');
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).send('Ошибка сервера при регистрации');
  }
};

function generateUniqueId() {
  return 'user-' + Date.now(); 
}

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Отправленные данные:', req.body); 

    const user = await User.findOne({ username });
    if (!user) {
      console.error(`Пользователь с именем ${username} не найден.`);
      return res.status(400).send('Неверные учетные данные');
    }

    console.log('Введённый пароль:', password);
    console.log('Захешированный пароль из базы:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Результат сравнения пароля:', isMatch);

    if (!isMatch) {
      console.error('Пароль не совпадает для пользователя:', username);
      return res.status(400).send('Неверные учетные данные');
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    res.redirect('/portfolio');
  } catch (err) {
    console.error('Ошибка при входе:', err);
    res.status(500).send('Ошибка сервера при входе');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Ошибка при выходе из системы:', err);
      return res.status(500).send('Ошибка при выходе из системы');
    }
    console.log('Пользователь успешно вышел из системы.');
    res.redirect('/auth/login'); 
  });
};
