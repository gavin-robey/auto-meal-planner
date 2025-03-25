import express from 'express';
import type { Application } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes';

const app : Application = express();
const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("<h1>Hello from the server another test yippie hello world</h1>")
})

app.use(
    createExpressMiddleware({
        router: appRouter,
    })
);

app.listen(port, ()=> {
    console.log("The Server is running on port: ", port)
});