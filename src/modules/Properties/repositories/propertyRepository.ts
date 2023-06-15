import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

interface CreateUser {
  cpf: string
}

class PropertyRepository {
  // function to create a product
  async create(cpf: string) {
    const user = await prisma.user.create({
      data: {
        cpf: cpf
      }
    })

    return user
  }

  async findByEmail(data: CreateUser) {
    const user = prisma.user.findFirst({
      where: {
        cpf: data.cpf
      }
    })

    return user
  }

  async findAll() {
    const user = await prisma.user.findMany()

    return user
  }

  async markAsPremium(cpf: string) {
    await prisma.user.updateMany({
      where: {
        cpf
      },
      data: {
        isPremium: true
      }
    })
  }
}

export { PropertyRepository }