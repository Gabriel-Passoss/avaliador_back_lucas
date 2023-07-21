import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";

import { PropertyRepository } from "../modules/Properties/repositories/propertyRepository";

const propertyRepository = new PropertyRepository()

const createUserSchema = z.object({
  cpf: z.string()
})


export async function userRoutes(app: FastifyInstance) {
  app.post('/user/find', async (request, reply) => {
    //@ts-ignore
    const data = createUserSchema.parse(request.body)
    const user = await propertyRepository.findByEmail(data)

    if (!user) {
      return reply.status(404).send()
    }
    
    return reply.status(200).send(user)
  })

  app.post('/user',  async (request: FastifyRequest, reply) => {
    //@ts-ignore
    const cpf = request.body.customer.identification_number
    
    if(!cpf) {
      //@ts-ignore
      return reply.status(400).send({message: 'CPF invalid or not exists'})
    }

    const user = await propertyRepository.create(cpf)

    return reply.status(201).send(user)
  })

  app.post('/user/pepper',  async (request, reply) => {
    const cpf = request.body
    console.log(cpf)
    // const user = await propertyRepository.create(cpf)

    return reply.status(201).send(cpf)
  })

  app.post('/user/manual',  async (request, reply) => {
    //@ts-ignore
    const { cpf } = request.body
    //@ts-ignore
    const user = await propertyRepository.create(cpf)

    return reply.status(201).send(user)
  })

  app.get('/user', async (request,reply) => {
    const users = await propertyRepository.findAll()
    return reply.status(200).send(users)
  })

  app.post('/user/premium', async (request,reply) => {
    //@ts-ignore
    const cpf = request.body.customer.identification_number
    const user = await propertyRepository.markAsPremium(cpf)

    return reply.status(201).send(user)
  })

  app.post('/user/admin', async (request,reply) => {
    //@ts-ignore
    const cpf = request.body.cpf
    const user = await propertyRepository.createAdmin(cpf)

    return reply.status(201).send(user) 
  })

  app.post('/user/cupom', async (request,reply) => {
    //@ts-ignore
    const cpf = request.body.customer.identification_number
    const user = await propertyRepository.markCupom(cpf)

    return reply.status(201).send(user)
  })
}