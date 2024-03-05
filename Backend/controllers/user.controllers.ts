import { Elysia, t } from "elysia";
import { prisma } from "../api/api";
import { Prisma } from '@prisma/client';

export const userController = new Elysia({ prefix: "/users" })
    .post("/register", async (context) => {
        const userData: any = context.body;

        const ceva = await prisma.user.create({
            data: {
                email: userData.email,
                username: userData.username,
                password: userData.password
            },
        });
    },
        {
            body: t.Object({ // request schema
                username: t.String({
                    minLength: 4,
                    maxLength: 20,
                    error: "Username must be between 4 and 20 characters."
                }),
                password: t.String({
                    minLength: 5,
                    maxLength: 50,
                    error: "Password must be between 8 and 50 characters."
                }),
                email: t.String({
                    format: 'email',
                    default: '',
                    error: 'Invalid email.'
                })
            }),
            error({ code, error }) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    switch (error.code) {
                        case 'P2002': // Account with the same data found
                            return "An account with this email already exists.";
                    }
                }
            }
        })