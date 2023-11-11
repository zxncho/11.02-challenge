const router = require("express").Router();
const values = require("../db/values");
const uuid {v1: uuidv1} = require('uuid')

router.get('/notes' , (req,res) => {
    values.getNotes()
    .then((notes) =>{
        return(res.json(notes));
    })
    .catch((err) => res.status(500).json(err));
});

router.post ("/notes" , (req,res) => {
    values.addNote()
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete ("notes/:id", (req,res) => {
    values.removeNote(req.params.id)
    then.(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;


