const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories 
router.get('/', (req, res) => {
  Category.findAll({
    // be sure to include its associated Products
    include: [{model: Product}]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

// GET a single category 
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// CREATE a category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE category by id 
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
