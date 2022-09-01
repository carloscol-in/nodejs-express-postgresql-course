const faker = require('faker');
const boom = require('@hapi/boom');
const { pool } = require('./../libs/postgres.pool')
const { models } = require('./../libs/sequelize')
const { Op } = require('sequelize')

class ProductsService {

  constructor() { }

  async find({ limit, offset, price, price_min, price_max }) {
    const options = {
      include: ['category'],
      limit,
      offset,
      where: {},
    }

    if (price) options.where.price = { [Op.eq]: price }

    if (price_min) {
      options.where.price = {
        ...options.where.price,
        [Op.gte]: price_min,
      }
    }

    if (price_max) {
      options.where.price = {
        ...options.where.price,
        [Op.lte]: price_max,
      }
    }

    const products = await models.Product.findAll(options)
    return products;
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async create(data) {
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
