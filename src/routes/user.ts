import { FastifyInstance } from "fastify";
import { z } from "zod";

import { PropertyRepository } from "../modules/Properties/repositories/propertyRepository";

const propertyRepository = new PropertyRepository()

const createUserSchema = z.object({
  email: z.string()
})


export async function userRoutes(app: FastifyInstance) {
  // Lista todos os imóveis
  app.post('/user/find', async (request, reply) => {
    //@ts-ignore
    const data = createUserSchema.parse(request.body)
    const user = await propertyRepository.findByEmail(data)
    return reply.status(200).send(user)
  })

  // Cria um imóvel 
  app.post('/user',  async (request, reply) => {
    //@ts-ignore
    const user = await propertyRepository.create(request.body.customer.email)

    return reply.status(201).send(user)
  })

  app.get('/user', async (request,reply) => {
    const users = await propertyRepository.findAll()
    return reply.status(200).send(users)
  })
}