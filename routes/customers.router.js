const express = require('express')

const CustomerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema
} = require('../schemas/customer.schema')

const router = express.Router()
const service = new CustomerService()

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find()
    res.json(customers)
  } catch (err) {
    next(err)
  }
})

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const customer = await service.create(body)
      res.json(customer)
    } catch (err) {
      next(err)
    }
  }
)

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      const customer = await service.update(id, body)
      res.json(customer)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const isDeleted = await service.delete(id)
      res.json({
        is_deleted: isDeleted
      })
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
