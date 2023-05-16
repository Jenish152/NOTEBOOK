const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
//FETCHALL NOTES FROM DATABASE INTO JSON FORMAT
router.get('/fetchallnotes', fetchuser, async (req, res) => { 
  try{
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes)
  }catch (error) {
      res.status(500).send("Internal Server Error!");
    }
})

//ADD NOTE:             
router.post('/addnotes', fetchuser, [
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //creat note
    const note = new Notes({
      title, description, tag, user: req.user.id
    })
    const savenote = await note.save()
    res.json(savenote)
  } catch (error) {
    res.status(500).send("Add Note Unsuccessfull!!");
  }
})

//update note end point
router.put('/update/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    if (tag) { newnote.tag = tag };
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("note found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("note allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note });
  } catch (error) {
    res.status(500).send("Unsuccessfull Updation!!");
  }

})
//delete note end point
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {

    let note = await Notes.findById(req.params.id);

    if (!note) {
      
      return res.status(404).send("Note Not Found!");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized User!");
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "deletion": "successfull" });
  } catch (error) {
    res.status(500).send("Unsuccessfull Deletion!!");
  }

})
module.exports = router



