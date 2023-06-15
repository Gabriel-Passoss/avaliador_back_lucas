import fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user'

export const app = fastify({})

app.register(userRoutes)

app.register(cors, {
  origin: '*'
});