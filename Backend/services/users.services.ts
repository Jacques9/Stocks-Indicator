import { PrismaClient } from "@prisma/client";
import { loginDto } from "../dtos/user.dtos"
import { HTTPException } from 'hono/http-exception'

const prisma = new PrismaClient();

export const registerUser = async (userData: loginDto) => {
    const userExists = await prisma.user.findFirst({
        where: {
            email: userData.email,
        }
    })

    if (userExists) {
        throw new HTTPException(401, { message: 'Account already exists.' });
    }

    try {
        await prisma.user.create({
            data: userData,
        })
    } catch (e) {
        throw new HTTPException(401, { message: 'Account already exists.' })
    }
}