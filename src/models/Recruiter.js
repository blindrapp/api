const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Company
const companySchema = new Schema({
    name: String
})

// Recruiter schema
const recruiterSchema = new Schema({
    name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    company: companySchema
})

const Recruiter = mongoose.model('Recruiter', recruiterSchema)

module.exports = Recruiter