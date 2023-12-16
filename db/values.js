const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const { title } = require('process');
// const { text } = require('express');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Values {
  read() {
    console.log(__dirname, 'db.json');
    return readFileAsync(__dirname + '/db.json', 'utf8');
  }

  write(notes) {
    return writeFileAsync('db.json', JSON.stringify(notes));
  }

  getValues() {
    return this.read().then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addValue(note) {
    const { title, text } = note;
    const newNote = { ...note, id: uuidv4() };

    if (!newNote.title || !newNote.text) {
      throw new Error("Value 'title' and 'text' cannot be blank");
    }

    // Get all values, add the new value, write all the updated values, return the newValue
    return this.getValues()
      .then((notes) => [...notes, newNote])
      .then((updatedValues) => this.write(updatedValues))
      .then(() => newNote);
  }

  removeValue(id) {
    // Get all values, remove the value with the given id, write the filtered values
    return this.getValues()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredValues) => this.write(filteredValues));
  }
}

module.exports = new Values();
