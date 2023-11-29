const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Values {
  read() {
    return readFileAsync('db.json', 'utf8');
  }

  write(values) {
    return writeFileAsync('db.json', JSON.stringify(values));
  }

  getValues() {
    return this.read().then((values) => {
      // Return the parsed values or an empty array if parsing fails
      return [].concat(JSON.parse(values) || []);
    });
  }

  addValue(value) {
    const { key, data } = value;

    if (!key || !data) {
      throw new Error("Value 'key' and 'data' cannot be blank");
    }

    // Add a unique id to the value using uuid package
    const newValue = { key, data, id: uuidv4() };

    // Get all values, add the new value, write all the updated values, return the newValue
    return this.getValues()
      .then((values) => [...values, newValue])
      .then((updatedValues) => this.write(updatedValues))
      .then(() => newValue);
  }

  removeValue(id) {
    // Get all values, remove the value with the given id, write the filtered values
    return this.getValues()
      .then((values) => values.filter((value) => value.id !== id))
      .then((filteredValues) => this.write(filteredValues));
  }
}

module.exports = new Values();
