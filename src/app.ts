import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user'

export const app = fastify({
  logger: false
})

app.register(userRoutes)

app.register(cors, {
  origin: '*'
});