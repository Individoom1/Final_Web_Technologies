const PortfolioItem = require('../models/PortfolioItem');

exports.getAllItems = async (req, res) => {
  try {
    const items = await PortfolioItem.find();
    res.render('portfolio/index', { items });
  } catch (err) {
    res.status(500).send('Ошибка сервера');
  }
};

exports.renderCreateForm = (req, res) => {
  res.render('portfolio/create');
};

exports.createItem = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const imageArray = images.split(',').map(img => img.trim());
    const newItem = new PortfolioItem({ title, description, images: imageArray });
    await newItem.save();
    res.redirect('/portfolio');
  } catch (err) {
    res.status(500).send('Ошибка сервера при создании элемента');
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);
    res.render('portfolio/edit', { item });
  } catch (err) {
    res.status(404).send('Элемент не найден');
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const imageArray = images.split(',').map(img => img.trim());
    await PortfolioItem.findByIdAndUpdate(req.params.id, {
      title,
      description,
      images: imageArray,
      updatedAt: Date.now(),
    });
    res.redirect('/portfolio');
  } catch (err) {
    res.status(500).send('Ошибка при обновлении элемента');
  }
};


exports.deleteItem = async (req, res) => {
  try {
    await PortfolioItem.findByIdAndDelete(req.params.id);
    res.redirect('/portfolio');
  } catch (err) {
    res.status(500).send('Ошибка при удалении элемента');
  }
};
