import { Elysia } from "elysia"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const app = new Elysia();

app.get("/", () => "Hello Elysia");

app.listen(3000, () => {
    console.log("Server is listening on port 8080")
});

export { app, prisma };