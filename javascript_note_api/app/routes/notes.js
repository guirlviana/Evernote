var express = require("express");
var router = express.Router();
const Note = require("../models/notes");
const withAuth = require("../middlewares/auth");

router.post("/", withAuth, async (req, res) => {
  const { title, body } = req.body;
  try {
    let note = new Note({ title: title, body: body, author: req.user._id });
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Not possible to create new note" });
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) res.json(note);
    else res.status(403).json({ error: "Permission denied" });
  } catch (error) {
    res.status(500).json({ error: "Not possible to get note" });
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    let notes = await Note.find({ author: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Not possible to get all notes" });
  }
});

router.put("/:id", withAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  try {
    let note = await Note.findById(id);
    if (isOwner(req.user, note)) {
      let note = await Note.findOneAndUpdate(
        id,
        { $set: { title: title, body: body, updated_at: Date.now() } },
        { upsert: true, new: true }
      );

      res.status(200).json(note);
    } else res.status(403).json({ error: "Permission denied" });
  } catch (error) {
    res.status(500).json({ error: "Not possible to update note" });
  }
});

const isOwner = (user, note) => {
  if (JSON.stringify(user._id) == JSON.stringify(note.author._id)) return true;
  return false;
};

module.exports = router;
