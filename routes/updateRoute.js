const express = require('express');
const router = express.Router();
const {
  updateDataVisualization,
} = require('../controller/visualizationController');

router.post('/', updateDataVisualization);

module.exports = router;
