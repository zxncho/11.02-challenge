const path = require('path');
const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// const randomId = uuidv4();
// const fs = require('fs');
// const notesPath = path.join(__dirname,"../db/db.json")

// router.get("/api/randomId", (req, res) => {
//     // Generate a random ID using uuidv4 and send it as JSON
//     const randomId = uuidv4();
//     res.json({ randomId });
// });

router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"), {randomId});
    return this;
});

router.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    return this;
});

module.exports = router;