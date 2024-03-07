import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { Hono } from 'hono'


const usersRouter = new Hono().use('*', clerkMiddleware())

usersRouter.post("/register", async (c) => {
    const { username, email, password } = await c.req.json()
    const auth = getAuth(c)

    console.log(auth?.userId)


    const clerkClient = c.get('clerk')

        const user = await clerkClient.users.createUser(
            {
                emailAddress: [email],
                password: password
            }
        )

        return c.json({
            user,
        })
})

usersRouter.post("/login", async (c) => {
    const { username, email, password } = await c.req.json()
    const auth = getAuth(c)
    console.log(auth)
    if (!auth?.userId) {
        return c.json({
          message: 'You are not logged in.'
        })
      }
    
      return c.json({
        message: 'You are logged in!',
        userId: auth.userId
    })
})

export default usersRouter;