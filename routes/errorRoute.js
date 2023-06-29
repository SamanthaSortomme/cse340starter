const express = require('express');
const router = express.Router();


router.get('/error',(req, res, next) => {
  throw new Error("this is bad")
});

module.exports = router;
