const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const cats = [
  {
    id: 1,
    name: 'Pawline McFluffy',
    sleeping: true
  },
  {
    id: 2,
    name: 'Meouwlina Fuzzles',
    sleeping: true
  },
  {
    id: 3,
    name: 'Clawsette',
    sleeping: true
  },
]

// /cats/
router.get('/', (req, res, next) => {
  res.json(cats);
});

router.get('/:id', (req, res, next) => {
  const foundCat = cats.find((cat) => cat.id === Number(req.params.id));
  if(!foundCat) {
    // next(ErrorObj) => catch it down the line
    return next(createError(404, 'Not Found'));
  }
  res.json(foundCat);
});

router.post('/', (req, res, next) => {
  const { body } = req;

  if(typeof body.name !== 'string') {
    return next(createError(422, 'Validation Error'));
  }
  const newCat = {
    id: cats.length + 1,
    name: body.name,
    sleeping: true
  };

  cats.push(newCat);
  res.status(201).json(newCat);
});

module.exports = router;