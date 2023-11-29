const path = require('path');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const myId = uuidv4();
const fs = require('fs');
const notesPath = path.join(__dirname,"../db/db.json")

router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"), {randomId});
});

router.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;