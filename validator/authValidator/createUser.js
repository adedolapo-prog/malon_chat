const joi = require("joi")

const createUserValidation = (requestData) => {
  const schema = joi.object().keys({
    password: joi.string().required(),
    email: joi
      .string()
      .required()
      .email({ tlds: { allow: false } }),
    fullName: joi.string().required(),
  })

  const isValidateResult = schema.validate(requestData)
  if (isValidateResult?.error) {
    throw new Error(`${isValidateResult.error?.message}//400`)
  } else {
    return { success: true }
  }
}

module.exports = { createUserValidation }
