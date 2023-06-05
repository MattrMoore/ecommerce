const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({ include: [{ model: Product, through: { model: ProductTag, attributes: [],
    },
    as: "tag_products", }]});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: { model: ProductTag, attributes: [],}, as: "tag_products" }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tags with that ID' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update({tag_name: req.body.tag_name,}, { where: {
      id: req.params.id,
    },
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });  
        if (!tagData) {
          res.status(404).json({ message: 'No tag with that ID.' });
          return;
        }
    
        res.status(200).json(tagData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;