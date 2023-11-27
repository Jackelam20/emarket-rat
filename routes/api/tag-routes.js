const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData)
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product}]
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tags found with that id! ぞのIDのタグは見つかりませんでした!"})
    return;
    }
    res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);

    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  
try {
  const tagData = await Tag.update(req.body, {
    where: {id: req.params.id}
  })
  if (!tagData) {
    res.status(404).json({message: "No Tag found with that ID! そのIDのタグが見つかりませんでした"})
    return;
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleteData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteData) {
      res.status(404).json({ message: 'No Tag found with that id! そのIDのタグは見つかりませんでした。' });
      return;
    }

    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
