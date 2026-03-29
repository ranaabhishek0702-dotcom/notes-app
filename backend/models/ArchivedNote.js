const mongoose = require('mongoose')
const archivedNoteSchema = new mongoose.Schema(
  {
    title : {
      type : String ,
      required : [true , 'Title is required'],
      trim : true
    },

    body : {
      type : String,
      required : [true , 'Body is required'],
      trim : true
    }
  },
  {timestamps : true}
)

const ArchivedNote = mongoose.model('ArchiveNote',archivedNoteSchema)
module.exports = ArchivedNote