import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const mysqlResetAutoIncrement = async (tableName: string) => {
  await prisma.$queryRaw`ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
}
const sqliteResetAutoIncrement = async (tableName: string) => {
  await prisma.$queryRaw`UPDATE 'sqlite_sequence' SET seq = 0 WHERE name = ${tableName};`
}

const reset = async () => {
  await prisma.users.deleteMany()
  await sqliteResetAutoIncrement('users')
  await sqliteResetAutoIncrement('todos')
  // await prisma.todos.deleteMany()
}
const todoListSeed = async () => {
  const idLength = 4
  const ids = Array(idLength)
    .fill('')
    .map((_, index) => (index + 1).toString())

  for (const template_id of ids) {
    const data = {
      userId: 1,
      content: `todo_${template_id}`,
      done: false,
    }
    await prisma.todos.create({ data })
  }
}

const adminSeed = async () => {
  const hashedPassword = await bcrypt.hash('password', 12)
  await prisma.users.create({
    data: {
      email: 'mail@mail.com',
      password: hashedPassword,
    },
  })
}

async function main() {
  await reset()
  console.log('reset done')
  console.log('Start seeding ...')
  await adminSeed()
  await todoListSeed()
  console.log('Seeding finished ...')
}

void main()
