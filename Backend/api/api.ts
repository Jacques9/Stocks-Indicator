import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRouter from '../routers/users.router';

const app = new Hono()

app.use('*', cors({
    origin: ['https://localhost:3000']
}))

app.route('/users', usersRouter);

export default app