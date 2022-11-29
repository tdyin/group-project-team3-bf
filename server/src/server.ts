import express, { Express, Request, Response } from 'express'
import connectDB from './config/db'
import routes from './routes';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { corsOptions } from './config/cors'
dotenv.config()
var cors = require('cors')

const { PORT } = process.env
console.log(PORT);

const app: Express = express()

connectDB()


// Middleawre
app.use(cors())
app.use('/', express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(corsOptions));

// Routes
app.use('/', routes);

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
