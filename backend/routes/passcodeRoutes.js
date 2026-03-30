const express = require('express')
const router = express.Router()
const {
  setPasscode,
  verifyPasscode,
  resetPasscode,
} = require('../controllers/passcodeController.js')

router.post('/set', setPasscode)
router.post('/verify', verifyPasscode)
router.post('/reset', resetPasscode)

module.exports = router