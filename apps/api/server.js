import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import config from './config/index.js'
import { swaggerOptions, swaggerUiOptions } from './config/swagger.js'
import dbPlugin from './plugins/db.js'
import userRoutes from './routes/userRoutes.js'

const fastify = Fastify({
  logger: {
    level: config.logLevel,
    transport:
      config.nodeEnv === 'development'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
  },
})

await fastify.register(cors, {
  origin: config.corsOrigin,
  credentials: true,
})

await fastify.register(sensible, {
  sharedSchemaId: 'HttpError',
})

await fastify.register(swagger, swaggerOptions)

await fastify.register(swaggerUi, {
  ...swaggerUiOptions,
  routePrefix: '/docs',
})

await fastify.register(dbPlugin)

await fastify.register(userRoutes, { prefix: '/api/users' })

fastify.get('/health', {
  schema: {
    description: 'Health check endpoint',
    tags: ['health'],
    summary: 'Check if the server is running',
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          status: { 
            type: 'string',
            description: 'Server status',
            examples: ['ok']
          },
          timestamp: { 
            type: 'string', 
            format: 'date-time',
            description: 'Current server time'
          },
        },
      },
    },
  },
}, async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
