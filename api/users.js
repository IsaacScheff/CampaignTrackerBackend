var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['name', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
