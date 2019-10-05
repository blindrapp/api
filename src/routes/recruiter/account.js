const express = require('express')
const router = express.Router()

const accountController = require('./../../controllers/recruiter/account')

router.post('/', accountController.create)

module.exports = router