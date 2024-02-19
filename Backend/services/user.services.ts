import { prisma } from "../api/api"
import type { RegistrationDTO, LoginDTO } from "../dtos/userDtos"
import { ApiResponse, ApiError } from "../utils/api.response";

export const checkPass = async (password: string) => {
    const errors: string[] = [];

    if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/(?=.*\W)/.test(password)) {
        errors.push("Password must contain at least one non-alphanumeric character.");
    }

    return errors;
};

export const createNewUser = async (data: RegistrationDTO): Promise<ApiResponse<any>> => {
    try {
        const existingUser = await prisma.users.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new ApiError(new ApiResponse<boolean>(false, null, ["User already exists."]));
        }

        const newUser = await prisma.users.create({
            data: {
                username: data.username,
                password: data.password,
                email: data.email
            }
        })
        
        return new ApiResponse<string>(true, null, null);
    } catch (error: any) {
        if (error instanceof ApiError) {
            throw error;
        } else {
            throw new ApiError(new ApiResponse<boolean>(false, null, [error.message]));
        }
    }
}