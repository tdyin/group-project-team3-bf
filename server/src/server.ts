import express, { Express, Request, Response } from 'express'
import connectDB from './config/db'
import routes from './routes'
import dotenv from 'dotenv'
dotenv.config()

const { PORT } = process.env

const app: Express = express()

connectDB()

// Middleawre
app.use('/', express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/test', routes.testRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.all('*', (req, res) => {
  res.status(400).json({
    msg: `The URI ${req.url} is not valid.`,
  })
})

app.listen(PORT || 8080, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
})
