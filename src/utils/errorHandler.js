module.exports.errorResponse = (joiError) => {

    const { path, type, context} = joiError.details[0]

    const fieldName = path[0].split("_").join(" ")

    const errorMessage = {
        'any.required': `The ${fieldName} field is required`,
        'string.min': `The ${fieldName} field should have at least ${context.limit} chars long`,
        'string.max': `The ${fieldName} field should have ${context.limit} chars at maximum`,
        'string.email': `The ${fieldName} field should be a valid email`,
        'string.pattern.base': fieldName === 'password' ? `The ${fieldName} field should have at least 1 uppercase letter, 1 number and 1 special char` : `The ${fieldName} field it's not valid.`
    }

    return errorMessage[type]

}