const express = require('express')
const router = express.Router()

const recruiterRoutes = require('./recruiter/index')

router.use('/recruiters', recruiterRoutes)

module.exports = router