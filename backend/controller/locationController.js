const fs = require('fs');
const { faker } = require('@faker-js/faker');

const generateLocations = (count = 1000) => {
    const features = [];

    for (let i = 0; i < count; i++) {
        const lat = parseFloat((Math.random() * 180 - 90).toFixed(6));
        const long = parseFloat((Math.random() * 360 - 180).toFixed(6));
        const score = Math.floor(Math.random() * 101);
        const name = faker.location.city();
        const address = faker.location.streetAddress();

        features.push({
            type: 'Feature',
            properties: {
                id: i + 1,
                name,
                address,
                score,
            },
            geometry: {
                type: 'Point',
                coordinates: [long, lat],
            },
        });
    }

    return {
        type: 'FeatureCollection',
        features,
    };
};




// const data = generateLocations();
// fs.writeFileSync('data/locations.json', JSON.stringify(data, null, 2));
// console.log('GeoJSON data generated successfully.');

module.exports = { generateLocations };
