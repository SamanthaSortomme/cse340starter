const express = require('express');
const router = express.Router();

router.get('/error', (req, res, next) => {
  const error = new Error('Intentional Error');
  error.status = 500;
  next(error);
});

module.exports = router;
