import { Elysia, t } from "elysia";
import { checkPass, createNewUser } from "../services/user.services";
import { ApiResponse } from "../utils/api.response";

export const userController = new Elysia({ prefix: "/user" })
    .post("/register", async (context) => {
        try {
            const userData: any = context.body;

            const passwordErrors = await checkPass(userData.password);
            if (passwordErrors.length > 0) {
                const response = new ApiResponse<boolean>(false, null, passwordErrors);
                context.set.status = 400;
                return response;
            }

            const newUser = await createNewUser(userData);

            context.set.status = 200;
            return new ApiResponse<string>(true, "Succesfull", null);

        } catch (error: any) {
            const response = new ApiResponse<boolean>(false, null, [error.message]);
            context.set.status = 400;
            return response;
        }
    },
        {
            body: t.Object({
                username: t.String(),
                password: t.String({
                    minLength: 8,
                    maxLength: 50,
                    error: "Password must be between 8 and 50 characters."
                }),
                email: t.String({
                    format: 'email',
                    default: '',
                    error: 'Invalid email.'
                })
            })
        })