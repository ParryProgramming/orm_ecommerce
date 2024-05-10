const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // finds all categories include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// finds one category by its `id` value including its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // displays if no category data is found
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    //comes back with category data results
    res.status(200).json(categoryData)
  } catch (err) {
    //comes back if server side errors
    res.status.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a category by its `id` value
  const categoryData = await Category.update(req.body, {
    where: {
      //Gets the tag based on the id given in the request parameters
      id: req.params.id,
    },
  }
  );
  return res.json(categoryData);
}),


  router.delete('/:id', async (req, res) => {
   // Delete the category with the matching ID
    console.log({ id: req.params.id })
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(categoryData)
      if (!categoryData) {
        res.status(404).json({ message: "ID not found!" });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  });

module.exports = router;