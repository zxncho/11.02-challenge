const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const router = require('./htmlRoutes');

const data = fs.readFileSync('db.json');

// Add a unique id to the value using uuid package
 const newValue = { key, data, id: uuidv4() };

const jsonData = JSON.parse(data);

// Loop through the JSON data and add a UUID to each object
jsonData.forEach((obj) => {
  obj.id = newValue;
});

// Write the updated JSON data back to the file
fs.writeFileSync('db.json', JSON.stringify(jsonData));

module.exports = router;