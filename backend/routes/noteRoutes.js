const express = require('express')
const router = express.Router()

const{
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('/Users/abhishekrana/notes-app/backend/controllers/noteController.js')

router.route('/').get(getNotes).post(createNote)
router.route('/:id').get(getNote).put(updateNote).delete(deleteNote)

module.exports = router