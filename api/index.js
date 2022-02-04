// var express = require('express');
// var router = express.Router();


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

"use strict";

const router = require("express").Router();


router.use('/worlds', require('./worlds'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
//router.use('/users', require('./users'));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
