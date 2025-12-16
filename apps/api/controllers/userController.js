import { UserService } from '../services/userService.js'

export class UserController {
  constructor(fastify) {
    this.fastify = fastify
    this.userService = new UserService(fastify.db)
  }

  async getAll(request, reply) {
    const users = await this.userService.getAll()
    return users
  }

  async getById(request, reply) {
    const { id } = request.params
    const user = await this.userService.getById(id)
    if (!user) {
      return reply.notFound('User not found')
    }
    return user
  }

  async create(request, reply) {
    const user = await this.userService.create(request.body)
    return reply.code(201).send(user)
  }

  async update(request, reply) {
    const { id } = request.params
    const user = await this.userService.update(id, request.body)
    if (!user) {
      return reply.notFound('User not found')
    }
    return user
  }

  async delete(request, reply) {
    const { id } = request.params
    const deleted = await this.userService.delete(id)
    if (!deleted) {
      return reply.notFound('User not found')
    }
    return reply.code(204).send()
  }
}
