const Joi = require('joi')

const { createUserSchema, updateUserSchema } = require('../schemas/user.schema')
const { UserSchema } = require('../db/models/user.model')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(20)
const lastName = Joi.string().min(3).max(20)
const phone = Joi.string().min(10).max(15)

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: createUserSchema
})

const updateCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: updateUserSchema
})

const getCustomerSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
}
