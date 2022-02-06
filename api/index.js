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
