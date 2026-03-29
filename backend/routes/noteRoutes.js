const express = require('express')
const router = express.Router()

const{
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('/Users/abhishekrana/notes-app/backend/controllers/noteController.js')