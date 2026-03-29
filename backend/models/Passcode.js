const mongoose = require('mongoose')
const passcodeSchema = new mongoose.Schema(
  {
    hash : {
      type : String ,
      required : true
    }
  },
  {
    timestamps : true
  }
)

const Passcode = mongoose.model('Passcode' , passcodeSchema)
module.exports = Passcode