const bcrypt = require('bcrypt')
const Passcode = require('../models/Passcode')
const ArchivedNote = require('../models/ArchivedNote')

// Reusable passcode check
const checkPasscode = async (passcode) => {
  const existing = await Passcode.findOne()
  if (!existing) return false
  return await bcrypt.compare(passcode, existing.hash)
}

// GET all archived notes
const getArchivedNotes = async (req, res) => {
  try {
    const valid = await checkPasscode(req.body.passcode)
    if (!valid) return res.status(401).json({ message: 'Wrong passcode' })

    const notes = await ArchivedNote.find()
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET single archived note
const getArchivedNote = async (req, res) => {
  try {
    const valid = await checkPasscode(req.body.passcode)
    if (!valid) return res.status(401).json({ message: 'Wrong passcode' })

    const note = await ArchivedNote.findById(req.params.id)
    if (!note) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json(note)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST create archived note
const createArchivedNote = async (req, res) => {
  try {
    const valid = await checkPasscode(req.body.passcode)
    if (!valid) return res.status(401).json({ message: 'Wrong passcode' })

    const note = await ArchivedNote.create({
      title: req.body.title,
      body: req.body.body,
    })
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT update archived note
const updateArchivedNote = async (req, res) => {
  try {
    const valid = await checkPasscode(req.body.passcode)
    if (!valid) return res.status(401).json({ message: 'Wrong passcode' })

    const note = await ArchivedNote.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      { new: true, runValidators: true }
    )
    if (!note) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// DELETE archived note
const deleteArchivedNote = async (req, res) => {
  try {
    const valid = await checkPasscode(req.body.passcode)
    if (!valid) return res.status(401).json({ message: 'Wrong passcode' })

    const note = await ArchivedNote.findByIdAndDelete(req.params.id)
    if (!note) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getArchivedNotes,
  getArchivedNote,
  createArchivedNote,
  updateArchivedNote,
  deleteArchivedNote,
}