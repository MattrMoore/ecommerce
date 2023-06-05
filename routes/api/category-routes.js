const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: [{ model: Product }]});
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Category.create(req.body, { category_name: req.body.category_name })
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => res.json(updatedCategory))
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });  
        if (!categoryData) {
          res.status(404).json({ message: 'No category with that ID.' });
          return;
        }
    
        res.status(200).json(categoryData);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;