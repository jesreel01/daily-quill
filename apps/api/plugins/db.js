import fp from 'fastify-plugin'

async function dbPlugin(fastify, opts) {
  const mockDb = {
    users: new Map(),
    products: new Map(),
  }

  fastify.decorate('db', mockDb)

  fastify.addHook('onClose', async (instance) => {
    instance.log.info('Closing database connection')
  })
}

export default fp(dbPlugin, {
  fastify: '5.x',
  name: 'db-plugin',
})
