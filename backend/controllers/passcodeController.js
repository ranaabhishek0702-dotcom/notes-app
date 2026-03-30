const bcrypt = require('bcrypt')
const Passcode = require('../models/Passcode.js')

const setPasscode = async(req , res) =>{
  try{
    const existing = await Passcode.findOne()
    if(existing){
      return res.status(400).json({message : 'Passcode already set'})
    }
    const hash = await bcrypt.hash(req.body.passcode , 10)
    await Passcode.create({hash})
    res.status(201).json({message : 'Passcode set successfully'})
  }
  catch(error){
    res.status(500).json({message : error.message})
    }
}

const verifyPasscode = async(req , res) => {
  try{
    const existing = await Passcode.findOne()
    if(!existing){
      return res.staus(404).json({message : 'No passcode set yet'})
    }
    const match = await bcrypt.compare(req.body.passcode , existing.hash)
    if(!match){
      return res.status(401).json({message : 'Wrong Passcode'})
    }
    res.status(200).json({message : 'Passcode verified'})
  }
  catch(error){
    res.status(500).json({message : error.message})
  }
}

const resetPasscode = async(req , res) => {
  try{
    const existing = await Passcode.findOne()
    if(!existing){
      return res.status(404).json({message : 'Passcode doesnt Exist'})
    }
    const match = await bcrypt.compare(req.body.oldPasscode, existing.hash)
    if(!match){
      return res.status(401).json({message : 'Wrong Passcode'})
    }

    const hash = await bcrypt.hash(req.body.newPasscode , 10)
    existing.hash = hash
    await existing.save()
    req.status(200).json({message : 'Passcode reset successfully'})
  }

  catch(error){
    res.status(500).json({message : error.message})
  }
}

module.exports = { setPasscode, verifyPasscode, resetPasscode }