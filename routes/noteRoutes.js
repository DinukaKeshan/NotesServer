import express from "express";
import Note from "../models/Note.js";
const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// POST new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newNote = await Note.create({ title, content });
  res.status(201).json(newNote);
});

// PUT update note
router.put("/:id", async (req, res) => {
  const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;
