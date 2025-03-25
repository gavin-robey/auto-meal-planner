import express from 'express';
import type { Application } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes';
import { createContext } from './lib/trpc';
import "./db/index";

const app : Application = express();
const port = process.env.PORT || 8000

app.use(
    createExpressMiddleware({
        router: appRouter,
        createContext: createContext,
    })
);

app.listen(port, ()=> {
    console.log("The Server is running on port: ", port)
});