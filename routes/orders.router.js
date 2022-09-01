const express = require('express');

const OrderService = require('../services/order.service')
const validatorHandler = require('../middlewares/validator.handler')
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema')

const router = express.Router()
const service = new OrderService()

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const order = await service.findOne(id)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const order = await service.create(body)
      res.json(order)
    } catch (err) {
      next(err)
    }
  }
)

router.post('/items',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req
      const newItem = await service.addItem(body)
      res.json(newItem)
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
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

module.exports = router;
