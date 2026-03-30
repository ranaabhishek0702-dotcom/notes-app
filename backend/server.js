const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('/Users/abhishekrana/notes-app/backend/config/db.js')
const noteRoutes = require('/Users/abhishekrana/notes-app/backend/routes/noteRoutes.js')
const archivedNoteRoutes = require('/Users/abhishekrana/notes-app/backend/routes/archivedNoteRoutes.js')
const passcodeRoutes = require('/Users/abhishekrana/notes-app/backend/routes/passcodeRoutes.js')
dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/notes', noteRoutes)
app.use('/api/archived', archivedNoteRoutes)
app.use('/api/passcode', passcodeRoutes)

const PORT = process.env.PORT || 3001


app.listen(PORT , () => {
  console.log(`http://localhost:${PORT}`)
})