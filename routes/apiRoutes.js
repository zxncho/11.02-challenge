const router = require("express").Router();
const values = require("../db/values");
const { v4: uuidv4} = require('uuid')
const myId = uuidv4();
router.get('/notes' , (req,res) => {
    values.getNotes()
    .then((notes) =>{
        return(res.json(notes));
    })
    .catch((err) => res.status(500).json(err));
});

router.post ("/notes" , (req,res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    values.addNote(newNote)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

router.delete ("notes/:id", (req,res) => {
    values.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;


