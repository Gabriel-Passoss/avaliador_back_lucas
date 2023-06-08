import { FastifyInstance } from "fastify";
import { z } from "zod";

import { PropertyRepository } from "../modules/Properties/repositories/propertyRepository";

const propertyRepository = new PropertyRepository()

const createUserSchema = z.object({
  email: z.string()
})


export async function userRoutes(app: FastifyInstance) {
  app.post('/user/find', async (request, reply) => {
    //@ts-ignore
    const data = createUserSchema.parse(request.body)
    const user = await propertyRepository.findByEmail(data)
    return reply.status(200).send(user)
  })

  app.post('/user',  async (request, reply) => {
    //@ts-ignore
    console.log(request.body.customer.email)
    //@ts-ignore
    const email = request.body.customer.email
    const user = await propertyRepository.create(email)

    return reply.status(201).send(user)
  })

  app.get('/user', async (request,reply) => {
    const users = await propertyRepository.findAll()
    return reply.status(200).send(users)
  })

  app.post('/user/premium', async (request,reply) => {
    //@ts-ignore
    const email = request.body.customer.email
    const user = await propertyRepository.markAsPremium(email)

    return reply.status(201).send(user)
  })
}