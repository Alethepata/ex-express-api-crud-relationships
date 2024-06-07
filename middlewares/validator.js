const { checkSchema, validationResult } = require("express-validator");

module.exports = (schema) => {
    return [checkSchema(schema), (req, res, next) => {
        const result = validationResult(req)
        const message = result.array().map(message => message.msg);
        if (!result.isEmpty()) {
            return res.status(400).json({errors: message})
        }
        next()

    }]
}