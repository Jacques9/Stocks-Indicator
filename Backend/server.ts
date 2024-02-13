// import Elysia from "elysia"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const createNull = await prisma.users.create({
  data: {
    email: 'user1@prisma.io',
    name: "Andrei1",
  },
})

console.log(createNull);