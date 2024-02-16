import Elysia from "elysia";
 
export const userController = new Elysia({ prefix: "/user" })
    .post("/login", () => {
        return "dal";
    })

    .post("/register", async (context) => {
        try {
            const el : any = context.body;
            return "Este = " + el.smth;
            
        } catch {

        }
    })