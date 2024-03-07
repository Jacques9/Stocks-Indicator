import { Hono } from 'hono'
import usersRouter from '../routers/users.router';

const app = new Hono()

app.route('/users', usersRouter);

export default app