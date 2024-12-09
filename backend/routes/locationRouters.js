const express = require('express');
const router = express.Router();
const { generateLocations } = require('../controller/locationController');
const cacheMiddleware = require('../middleware/cacheMiddleware');

router.use(cacheMiddleware);

router.get('/', (req, res) => {
  try {
      const locations = generateLocations(1000);
  } catch (error) {
      console.error('Error generating locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
