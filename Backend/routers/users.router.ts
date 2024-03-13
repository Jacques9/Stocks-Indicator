import { Hono } from 'hono'

import {
    registerUser,
} from '../services/users.services';

const usersRouter = new Hono()

usersRouter.post("/register", async (c) => {
    const { username, email, password } = await c.req.json();

    await registerUser({ username, email, password });

    return c.text("Account created succesfully.", 200);
})

usersRouter.get('/', async (c) => {
})

usersRouter.onError((err, c) => {
    // console.error(`${err}`)
    return c.text(`${err}`, 500)
})

export default usersRouter;