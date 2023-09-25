const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tag` endpoint

// GET all tags
router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }]
  }).then((tagData) => {
    res.json(tagData);
  });
});

// GET single tag by id
router.get('/:id', async (req, res) => {
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!tagData) {
            res.status(404).json({ message: "Tag not found" });
            return;
        }
        res.json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
      const newTag = await Tag.create(req.body);
      res.status(200).json(newTag);
  } catch (err) {
      res.status(400).json(err);
  }
});

// UPDATE a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return; 
    }
    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
