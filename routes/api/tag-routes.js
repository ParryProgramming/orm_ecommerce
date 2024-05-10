const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finds all tags including its associated Product
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds one tag by its `id` value including its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    // displays if no tag data is found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    //comes back with tag data results
    res.status(200).json(tagData)
  } catch (err) {
    //comes back if server side errors
    res.status.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a tag's name by its `id` value
  const tagData = await Tag.update(req.body, {
    where: {
      //Gets the tag based on the id given in the request parameters
      id: req.params.id,
    },
  }
  );
  return res.json(tagData);
});

router.delete('/:id', async (req, res) => {
  // deletes one tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;