import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { prismaClient } from './config/prismaClient';
// import { PrismaClient } from '@prisma/client'

dotenv.config();


const app: Express = express();
const port = process.env.PORT
app.use(express.json())

// const prisma = new PrismaClient()
// prisma.$connect()

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!')
// })

// app.get('/users', async (req: Request, res: Response) => {
//     const users = await prisma.user.findMany()
//     res.json(users)
// })

// app.post('/users', async (req: Request, res: Response) => {
//     const { firstName, email } = req.body
//     const user = await prisma.user.create({
//         data: {
//             firstName,
//             email,
            
//         },
//     })

//     res.json(user)
// })

app.listen(port, () => {
    prismaClient.$connect()
    router(app)
    console.log(`Server is running on port ${port} .🚀`)
})
