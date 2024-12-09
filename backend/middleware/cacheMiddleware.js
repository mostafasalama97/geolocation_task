const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/locations.json');
let geojsonData = null;

const cacheMiddleware = (req, res, next) => {
  if (!geojsonData) {
    geojsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  next();
};

module.exports = cacheMiddleware;
