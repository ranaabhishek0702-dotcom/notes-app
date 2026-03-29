const Note = require('/Users/abhishekrana/notes-app/backend/models/Note.js')

const getNotes = async(req , res) => {
  try{
    const notes = await Note.find()
    res.status(200).json(notes)

  }

  catch(error){
    res.status(500).json({message : error.message})
  }
}

const getNote = async(req , res) => {
  try{
    const note = await Note.findById(req.params.id)
    if(!note){
      return res.status(404).json({message : "note not found"})
    }

    res.status(200).json(note)
  }
  catch(error){
    res.status(500).json({message : error.message})

  }
}


const createNote = async(req , res) => {
  try{
    const note = await Note.create({
      title : req.body.title,
      body : req.body.body
    })
    res.status(201).json(note)
  }
  catch(error){
    res.status(400).json({message : error.message})
  }
}

const updateNote = async(req , res) => {
  try{
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {title : req.body.title , body : req.body.body},
      {new : true , runValidators : true}
    )
    if(!note){
      res.status(404).json({message : 'note not found'}) 
     }

    res.status(200).json(note)
  
    }

  catch(error){
    res.status(400).json({message : error.message})

  }

  }


const deleteNote = async(req , res) =>{
  try{
    const note = await Note.findByIdAndDelete(req.params.id)
    if(!note){
      return res.status(404).json({message : 'note not found'})
    }
    res.status(200).json({message : 'Note deleted'})
  }
  catch(error){
    res.status(500).json({message : error.message})
  }
}

module.exports = {getNote , getNotes , createNote , updateNote , deleteNote}