import { PrismaClient } from '@prisma/client'
import faker from 'faker'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  
  for( let i = 0; i < 300; i++) {
    let user = await prisma.user.create({
      data: {
        name: `${faker.name.findName()} ${faker.name.lastName()}`,
        email: `${faker.internet.email()}`,
        password: `${faker.internet.password()}`,
        sexo: `${faker.name.gender()}`
      }
    })
  }

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })