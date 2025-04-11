import express from 'express';
import type { Application } from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes';
import { createContext } from './lib/trpc';
import "src/db";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/verify', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'verify.html'));
});

app.use(
    createExpressMiddleware({
        router: appRouter,
        createContext: createContext,
    })
);

app.listen(port, () => {
    console.log("The Server is running on port: ", port);
});