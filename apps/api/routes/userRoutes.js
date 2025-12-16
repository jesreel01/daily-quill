import { UserController } from '../controllers/userController.js'
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  getAllUsersSchema,
  deleteUserSchema,
} from '../schemas/userSchema.js'

async function userRoutes(fastify, opts) {
  const controller = new UserController(fastify)

  fastify.get('/', { schema: getAllUsersSchema }, controller.getAll.bind(controller))

  fastify.get('/:id', { schema: getUserSchema }, controller.getById.bind(controller))

  fastify.post('/', { schema: createUserSchema }, controller.create.bind(controller))

  fastify.put('/:id', { schema: updateUserSchema }, controller.update.bind(controller))

  fastify.delete('/:id', { schema: deleteUserSchema }, controller.delete.bind(controller))
}

export default userRoutes
