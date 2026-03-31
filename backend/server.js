const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const noteRoutes = require('./routes/noteRoutes')
const archivedNoteRoutes = require('./routes/archivedNoteRoutes')
const passcodeRoutes = require('./routes/passcodeRoutes')
dotenv.config({ override: false })

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