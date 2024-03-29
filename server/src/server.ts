import express, { Express, Request, Response } from 'express'
import connectDB from './config/db'
import routes from './routes';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { corsOptions } from './config/cors'
dotenv.config()

const { PORT } = process.env
const app: Express = express()
connectDB()

// Middleawre
app.use('/', express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(corsOptions));

// Routes
app.use('/', routes);

app.all('*', (req, res) => {
  res.status(400).json({
    msg: `The URI ${req.url} is not valid.`,
  })
})

app.listen(PORT || 8080, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
})
