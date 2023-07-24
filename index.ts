import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

dotenv.config();


const app: Express = express();
const port = process.env.PORT
const prisma = new PrismaClient()
prisma.$connect()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post('/users', async (req: Request, res: Response) => {
    const { name, email } = req.body
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    })

    res.json(user)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} .🚀`)
})
