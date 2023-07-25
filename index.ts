import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { prismaClient } from './config/prismaClient';

dotenv.config();

const app: Express = express();
const port = process.env.PORT
app.use(express.json())

app.listen(port, () => {
    prismaClient.$connect()
    router(app)
    console.log(`Server is running on port ${port} .🚀`)
})
