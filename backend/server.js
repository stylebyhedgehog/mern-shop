import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send('З')
  })

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT)
