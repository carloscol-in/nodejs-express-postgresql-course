const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    let answer = await models.User.create(data)

    return answer;
  }

  async find() {
    const users = await models.User.findAll({
      include: ['customer']
    })
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)

    if (!user) throw boom.notFound('User not found')

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id)

    const answer = await user.update(changes)

    return answer;
  }

  async delete(id) {
    const user = await this.findOne(id)

    await user.destroy()

    return { id };
  }
}

module.exports = UserService;
