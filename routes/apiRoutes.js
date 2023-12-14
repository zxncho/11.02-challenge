const router = require("express").Router();
const values = require("../db/values");
const { v4: uuidv4} = require('uuid')
const myId = uuidv4();


// router.get("/notes", (req, res) => {
//     res.sendFile(notesPath, { randomId });
// });

router.get('/notes' , (req,res) => { // GET http://localhost:3301/api/notes
     values
    .getValues()
    .then((values) =>{
        return(res.json(values));
    })
    .catch((err) => res.status(500).json(err));
});

router.post ('/notes', (req,res) => {
    values.addValue
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    addValue(req.body)
        .then((value) => res.json(value))
        .catch((err) => res.status(500).json(err));
});

router.delete ("/notes/:id", (req,res) => {
    values
    .removeValue(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;



