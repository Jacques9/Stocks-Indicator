import { Elysia } from "elysia"
import { PrismaClient } from "@prisma/client"

import { swagger, cors } from "./pluginSetup.ts";

const prisma = new PrismaClient();
const app = new Elysia();

app.use(swagger())
app.use(cors())

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});

export { app, prisma };