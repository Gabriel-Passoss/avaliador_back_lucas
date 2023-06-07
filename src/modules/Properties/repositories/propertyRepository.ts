import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

interface CreateUser {
  email: string
}

class PropertyRepository {
  // function to create a product
  async create(data: CreateUser) {
    const user = await prisma.user.create({
      data: {
        email: data.email
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
}

export { PropertyRepository }