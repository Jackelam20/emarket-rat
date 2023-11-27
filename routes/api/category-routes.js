const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({include: [{model: Product}]})
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model:Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Categories found with that id! ぞのIDのカテゴリは見つかりませんでした！"})
    return;
    }
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  try {
    // every category has an id and a category_name
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
      } catch (err) {
        res.status(400).json(err);
      }
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
  where: { id: req.params.id}
  });
  if (!categoryData) {
    res.status(404).json({message: "No Category found with that ID! そのIDのカテゴリが見つかりませんでした"})
  return;
  }
  res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  try {
    const deleteCategoryData = await Category.destroy({
    where: {id: req.params.id}
    });
    if (!deleteCategoryData) {
      res.status(404).json({message: "No Category found with that ID! そのIDのカテゴリが見つかりませんでした"})
    return;
    }
    res.status(200).json(deleteCategoryData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;
