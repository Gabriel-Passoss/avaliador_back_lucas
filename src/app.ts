import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user'

export const app = fastify({
  logger: true
})

app.register(userRoutes)
app.register(cors, {
  origin: '*'
});