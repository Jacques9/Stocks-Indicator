import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { userController } from "../controllers/user.controllers";
import { swagger } from "@elysiajs/swagger";
import { helmet } from 'elysia-helmet';
import cors from "@elysiajs/cors";

const prisma = new PrismaClient();
const app = new Elysia();

app.use(helmet())
app.use(swagger())
app.use(cors())

app.use(userController as any)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});

export { app, prisma };