import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

interface CreateUser {
  email: string
}

class PropertyRepository {
  // function to create a product
  async create(email: string) {
    const user = await prisma.user.create({
      data: {
        email
      }
    })

    return user
  }

  async findByEmail(data: CreateUser) {
    const user = prisma.user.findFirst({
      where: {
        email: data.email
      }
    })

    return user
  }

  async findAll() {
    const user = await prisma.user.findMany()

    return user
  }
}

export { PropertyRepository }