const router = require("express").Router();
const values = require("../db/values");
const notes = require("../db/values");
const { v4: uuidv4 } = require('uuid')



// router.get("/notes", (req, res) => {
//     res.sendFile(notesPath, { randomId });
// });

router.get('/notes' , (req,res) => { // GET http://localhost:3301/api/notes
     notes
    .getValues()
    .then((notes) =>{
        return(res.json(notes));
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
        notes
        .addValue(req.body)
        .then(() => notes.getValues())  // Get the updated list of notes
        .then((updatedValues) => res.json(updatedValues))
        .catch((err) => res.status(500).json(err));
});


router.delete ("/notes/:id", (req,res) => {
   notes
    .removeValue(req.params.id)
    .then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;



