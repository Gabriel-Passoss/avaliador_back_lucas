import fastify from 'fastify'
import { userRoutes } from './routes/user'

export const app = fastify({
  logger: true
})

app.register(userRoutes)