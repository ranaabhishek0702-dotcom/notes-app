const express = require('express')
const router = express.Router()
const {
  getArchivedNotes,
  getArchivedNote,
  createArchivedNote,
  updateArchivedNote,
  deleteArchivedNote,
} = require('/Users/abhishekrana/notes-app/backend/controllers/archivedNoteController.js')

router.route('/').get(getArchivedNotes).post(createArchivedNote)
router.route('/:id').get(getArchivedNote).put(updateArchivedNote).delete(deleteArchivedNote)

module.exports = router