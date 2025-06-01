import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/ErrorMiddleware'
import user_router from './router/user.router'
import todos_router from './router/todos.router'
import corsOptions from './config/corsOptions'
import 'dotenv/config'


const app = express()


//Middlewares
app.use(corsOptions)
app.use(express.json())
app.use(cookieParser())


//user
app.use('/api/v1/user', user_router)

//todos
app.use('/api/v1/todos', todos_router)




//Health Check
app.get('/', (_req: Request, res: Response) => {
     res.status(200).json({
          message: "Todo list server working fine"
     })
})

app.use(errorMiddleware)

export default app
