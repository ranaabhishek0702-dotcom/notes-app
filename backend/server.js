const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('/Users/abhishekrana/notes-app/backend/config/db.js')

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/' , (req , res) => {
  res.send("Notes API is running")
})

const PORT = process.env.PORT || 3001


app.listen(PORT , () => {
  console.log(`http://localhost:${PORT}`)
})