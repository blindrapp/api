const mongoose = require('mongoose')
const Recruiter = require('./../../../models/Recruiter')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const errorHandler = require('./../../../utils/errorHandler')
require('dotenv').config

module.exports = async (req, res) => {
    try {
        let validatedData = await schema.validateAsync(req.body)
        validatedData.company = { name: validatedData.company }

        const saltRounds = process.env.SALT_ROUNDS || 10

        bcrypt.hash(validatedData.password, saltRounds).then(hash => {
            validatedData.password = hash
            const recruiter = new Recruiter(validatedData)

            recruiter.save().then(data => {
                return res.status(200).json({message: "Your account has been created", recruiter: _.pick(data, ['name', 'last_name'])})
            }).catch(err => {
                if (err.code === 11000) return res.status(422).json({message: "Invalid data", errors: "The given email is already been registered"})
                
                // Need to handle another erro code
            })
        })
    } catch (err) {
        return res.status(422).json({message: "Invalid data", errors: errorHandler.errorResponse(err), handler: err})
    }
}

const schema = Joi.object({
    name:       Joi.string()
                .min(2)
                .max(30)
                .required(),
    last_name:  Joi.string()
                .min(3)
                .max(30)
                .required(),
    email:      Joi.string()
                .email()
                .required(),
    password:   Joi.string()
                .min(8)
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
                .required(),
    company:    Joi.string()
                .required()

})